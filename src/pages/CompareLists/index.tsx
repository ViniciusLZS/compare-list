/* eslint-disable no-plusplus */
import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import * as S from './styles';
import ListService from '../../services/ListService';

import Compare from '../../assets/image/icons/myList/compare.svg';
import maskMoney from '../../utils/maskMoney';
import ProductService from '../../services/ProductService';

import imageNotFound from '../../assets/image/imageNotFound.svg';
import Loader from '../../components/Loader';

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

export default function CompareLists() {
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

  return (
    <>
      <Loader isLoading={isLoading} />

      {!isLoading && (
      <S.Container>
        <S.Header>
          <h1>Compare</h1>
          <div className="listName">
            <div>
              <h2>{lists[0]?.name}</h2>
              <span>{maskMoney(String(lists[0]?.total))}</span>
            </div>
            <div>
              <h2>{lists[1]?.name}</h2>
              <span>{maskMoney(String(lists[1]?.total))}</span>
            </div>
          </div>
        </S.Header>
        <S.Content>
          {compareResult.map((product) => (
            <S.Card key={product[0].id}>
              <S.CardSmall>
                {product[0].name ? (
                  <>
                    <S.Title>{product[0].name}</S.Title>

                    <S.Image>
                      <img
                        src={product[0].image
                          ? `${product[0].image}`
                          : imageNotFound}
                        alt=""
                      />
                    </S.Image>

                    <S.ContainerValue
                      match={product[0].match}
                      compareValue={product[0].compareValue}
                      lowPrice={product[0].lowPrice}
                    >
                      <div className="amount">
                        <span>
                          {`${product[0].amount} ${product[0].measureName || 'Medida'}`}
                        </span>
                      </div>

                      <div className="values">
                        <span>
                          {product[0].value !== null ? maskMoney(product[0].value.toString()) : 'R$ 0,00'}
                        </span>
                      </div>

                      <div className="total">
                        <span>{product[0].total !== null ? maskMoney(product[0].total.toString()) : 'R$ 0,00'}</span>
                      </div>
                    </S.ContainerValue>
                  </>
                ) : <p>Não foi encontrar um produto com o nome igual para comparar.</p>}
              </S.CardSmall>

              <img src={Compare} alt="Símbolo de Comparação" />

              <S.CardSmall>
                {product[1].name ? (
                  <>
                    <S.Title>{product[1].name}</S.Title>

                    <S.Image>
                      <img
                        src={product[1].image
                          ? `${product[1].image}`
                          : imageNotFound}
                        alt=""
                      />
                    </S.Image>

                    <S.ContainerValue
                      match={product[1].match}
                      compareValue={product[1].compareValue}
                      lowPrice={product[1].lowPrice}
                    >
                      <div className="amount">
                        <span>
                          {`${product[1].amount} ${product[1].measureName || 'Medida'}`}
                        </span>
                      </div>

                      <div className="values">
                        <span>
                          {product[1].value !== null ? maskMoney(product[1].value.toString()) : 'R$ 0,00'}
                        </span>
                      </div>

                      <div className="total">
                        <span>{product[1].total !== null ? maskMoney(product[1].total.toString()) : 'R$ 0,00'}</span>
                      </div>
                    </S.ContainerValue>
                  </>
                ) : <p>Não foi encontrar um produto com o nome igual para comparar.</p>}
              </S.CardSmall>
            </S.Card>
          ))}

        </S.Content>
      </S.Container>
      )}
    </>
  );
}
