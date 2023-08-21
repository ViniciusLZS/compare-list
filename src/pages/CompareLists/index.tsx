import * as S from './styles';

import Compare from '../../assets/image/icons/myList/compare.svg';
import maskMoney from '../../utils/maskMoney';

import imageNotFound from '../../assets/image/imageNotFound.svg';
import Loader from '../../components/Loader';
import useCompareLists from './useCompareLists';

export default function CompareLists() {
  const {
    isLoading,
    lists,
    compareResult,
  } = useCompareLists();

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
                ) : <p>Não foi encontrado um produto com o nome igual para comparar.</p>}
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
                ) : <p>Não foi encontrado um produto com o nome igual para comparar.</p>}
              </S.CardSmall>
            </S.Card>
          ))}

        </S.Content>
      </S.Container>
      )}
    </>
  );
}
