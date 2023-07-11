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
  lowPrice?:string | null;
}

export default function CompareLists() {
  const [lists, setLists] = useState<ListProps []>([]);
  const [products, setProducts] = useState<ProductProps[][]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem('token') || '';

  const params = useParams<Params>();

  useEffect(() => {
    const handleList = async (id: string) => {
      try {
        setIsLoading(true);
        const list = await ListService.getList({ id, token });
        setLists((prevState) => [...prevState, list]);

        const product: ProductProps[] = await ProductService.listProducts({ id, token });
        setProducts((prevState) => [...prevState, product]);
      } catch {} finally {
        setIsLoading(false);
      }
    };

    const ids = Object.entries(params);
    ids.forEach((id) => {
      handleList(id[1]);
    });
  }, [params, token]);

  const compareArrays = (arr1: ProductProps[], arr2: ProductProps[]) => {
    const arrayGlobal: ProductProps[][] = [];

    if (arr2) {
      for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
          if (arr1[i].name === arr2[j].name) {
            let array;
            if (Number(arr1[i].total) < Number(arr2[j].total)) {
              const array1 = { ...arr1[i], lowPrice: 'low' };
              const array2 = { ...arr2[j], lowPrice: 'hight' };
              array = [array1, array2];
              arrayGlobal.push(array);
            } else
            if (Number(arr2[j].total) < Number(arr1[i].total)) {
              const array1 = { ...arr1[i], lowPrice: 'hight' };
              const array2 = { ...arr2[j], lowPrice: 'low' };
              array = [array1, array2];
              arrayGlobal.push(array);
            } else {
              const array1 = { ...arr1[i], lowPrice: null };
              const array2 = { ...arr2[j], lowPrice: null };
              array = [array1, array2];
              arrayGlobal.push(array);
            }
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

                    <S.ContainerValue lowPrice={product[0].lowPrice}>
                      <div className="values">
                        <span>
                          {`${product[0].amount} ${product[0].measureName || 'Medida'}`}
                        </span>
                        <span>{product[0].value !== null ? maskMoney(product[0].value.toString()) : 'R$ 0,00'}</span>
                      </div>

                      <div className="total">
                        <span>{product[0].total !== null ? maskMoney(product[0].total.toString()) : 'R$ 0,00'}</span>
                      </div>
                    </S.ContainerValue>
                  </>
                ) : <p>Não existe produto para similar</p>}
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

                    <S.ContainerValue lowPrice={product[1].lowPrice}>
                      <div className="values">
                        <span>
                          {`${product[1].amount} ${product[1].measureName || 'Medida'}`}
                        </span>
                        <span>{product[1].value !== null ? maskMoney(product[1].value.toString()) : 'R$ 0,00'}</span>
                      </div>

                      <div className="total">
                        <span>{product[1].total !== null ? maskMoney(product[1].total.toString()) : 'R$ 0,00'}</span>
                      </div>
                    </S.ContainerValue>
                  </>
                ) : <p>Não existe produto para similar</p>}
              </S.CardSmall>
            </S.Card>
          ))}

        </S.Content>
      </S.Container>
      )}
    </>
  );
}
