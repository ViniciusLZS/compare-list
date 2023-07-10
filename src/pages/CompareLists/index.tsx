import { useParams } from 'react-router-dom';

import { useCallback, useEffect, useState } from 'react';
import * as S from './styles';
import ListService from '../../services/ListService';

import Compare from '../../assets/image/icons/myList/compare.svg';
import maskMoney from '../../utils/maskMoney';
import ProductService from '../../services/ProductService';

interface Params {
  id1: string;
  id2: string;
}

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
}

export default function CompareLists() {
  const [lists, setLists] = useState<ListProps []>([]);
  const [products, setProducts] = useState<ProductProps[][]>([]);

  const token = localStorage.getItem('token') || '';

  const params = useParams<Params>();

  useEffect(() => {
    const handleList = async (id: string) => {
      try {
        const list = await ListService.getList({ id, token });
        setLists((prevState) => [...prevState, list]);

        const product: ProductProps[] = await ProductService.listProducts({ id, token });
        setProducts((prevState) => [...prevState, product]);
      } catch {}
    };

    const ids = Object.entries(params);
    ids.forEach((id) => {
      handleList(id[1]);
    });
  }, [params, token]);

  const compareArrays = (arr1: ProductProps[], arr2: ProductProps[]) => {
    const arrayGlobal = [];

    if (arr2) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < arr1.length; i++) {
      // eslint-disable-next-line no-plusplus
        for (let j = 0; j < arr2.length; j++) {
          if (arr1[i].name === arr2[j].name) {
            const array = [
              arr1[i],
              arr2[j],
            ];
            arrayGlobal.push(array);
          }
        }
      }
    }

    return arrayGlobal;
  };

  const compareResult = compareArrays(products[0] || [], products[1] || []);
  console.log('🚀 ~ file: index.tsx:88 ~ CompareLists ~ compareResult:', compareResult);

  return (
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
        <S.Card>
          <S.CardSmall>
            {/* <S.Title view={view}>{product.name}</S.Title>

              <S.Image view={view}>
                <img
                  src={product.image
                    ? `${product.image}`
                    : imageNotFound}
                  alt=""
                />
              </S.Image> */}

            {/* <S.ContainerValue view={view}>
              <div className="values">
                <span>
                  {`${product.amount} ${product.measureName || 'Medida'}`}
                </span>
              </div>

              <div className="total">
              </div>
            </S.ContainerValue> */}
          </S.CardSmall>

          <img src={Compare} alt="Símbolo de Comparação" />

          <S.CardSmall>
            <p>213123</p>
          </S.CardSmall>
        </S.Card>
      </S.Content>
    </S.Container>
  );
}
