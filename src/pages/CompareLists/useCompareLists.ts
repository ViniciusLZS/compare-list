/* eslint-disable no-plusplus */

import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import ListService from '../../services/ListService';
import ProductService from '../../services/ProductService';

interface ListProps {
  id: string;
  name: string;
  estimated: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: string;
}

interface ProductProps {
  id: string;
  name: string;
  value: number;
  amount: number;
  total: number;
  measureName: string
  image: string;
  lowPrice?:string | null;
  match?: string;
  compareValue?:string | null;
}

export default function useCompareLists() {
  const [lists, setLists] = useState<ListProps []>([]);
  const [products, setProducts] = useState<ProductProps[][]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem('token') || '';

  const params = useParams();

  useEffect(() => {
    const controller = new AbortController();

    const handleList = async (id: string | undefined) => {
      try {
        setIsLoading(true);
        if (id) {
          const list = await ListService.getList({ id, token, signal: controller.signal });
          setLists((prevState) => [...prevState, list]);

          const product: ProductProps[] = await ProductService.listProducts({
            id,
            token,
            signal: controller.signal,
          });
          setProducts((prevState) => [...prevState, product]);
        }
        setIsLoading(false);
      } catch {}
    };

    const ids = Object.entries(params);
    ids.forEach((id) => {
      handleList(id[1]);
    });

    return () => {
      controller.abort();
    };
  }, [params, token]);

  const compareArrays = (arr1: ProductProps[], arr2: ProductProps[]) => {
    const arrayGlobal: ProductProps[][] = [];

    if (arr2) {
      for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
          if (arr1[i].name === arr2[j].name) {
            let array;
            let array1;
            let array2;

            if (Number(arr1[i].total) < Number(arr2[j].total)) {
              array1 = { ...arr1[i], lowPrice: 'low' };
              array2 = { ...arr2[j], lowPrice: 'hight' };
              array = [array1, array2];
            } else
              if (Number(arr2[j].total) < Number(arr1[i].total)) {
                array1 = { ...arr1[i], lowPrice: 'hight' };
                array2 = { ...arr2[j], lowPrice: 'low' };
                array = [array1, array2];
              } else {
                array1 = { ...arr1[i], lowPrice: null };
                array2 = { ...arr2[j], lowPrice: null };
                array = [array1, array2];
              }

            if (Number(arr1[i].value) < Number(arr2[j].value)) {
              array1 = { ...array1, compareValue: 'low' };
              array2 = { ...array2, compareValue: 'hight' };
              array = [array1, array2];
            } else
              if (Number(arr2[j].value) < Number(arr1[i].value)) {
                array1 = { ...array1, compareValue: 'hight' };
                array2 = { ...array2, compareValue: 'low' };
                array = [array1, array2];
              } else {
                array1 = { ...array1, compareValue: null };
                array2 = { ...array2, compareValue: null };
                array = [array1, array2];
              }

            if ((arr1[i].amount !== arr2[j].amount)
             || (arr1[i].measureName !== arr2[j].measureName)) {
              array1 = { ...array1, match: 'false' };
              array2 = { ...array2, match: 'false' };
              array = [array1, array2];
            }
            arrayGlobal.push(array);
          }
        }
      }

      for (let i = 0; i < arr1.length; i++) {
        let found = false;
        for (let j = 0; j < arrayGlobal.length; j++) {
          if (arr1[i].name === arrayGlobal[j][0]?.name) {
            found = true;
            break;
          }
        }
        if (!found) {
          const array = [arr1[i], {
            id: Math.random().toString(), name: '', value: 0, amount: 0, total: 0, measureName: '', image: '',
          }];
          arrayGlobal.push(array);
        }
      }

      for (let i = 0; i < arr2.length; i++) {
        let found = false;
        for (let j = 0; j < arrayGlobal.length; j++) {
          if (arr2[i].name === arrayGlobal[j][1]?.name) {
            found = true;
            break;
          }
        }
        if (!found) {
          const array = [{
            id: Math.random().toString(), name: '', value: 0, amount: 0, total: 0, measureName: '', image: '',
          }, arr2[i]];
          arrayGlobal.push(array);
        }
      }
    }

    return arrayGlobal;
  };

  const compareResult = compareArrays(products[0] || [], products[1] || []);

  return {
    isLoading,
    lists,
    compareResult,
  };
}
