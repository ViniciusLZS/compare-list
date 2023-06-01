/* eslint-disable react/jsx-one-expression-per-line */
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

import Loader from '../Loader';

import Apple from '../../assets/image/apple.svg';
import Trash from '../../assets/image/icons/bin.svg';
import Empty from '../../assets/image/empty-box.svg';
import Sad from '../../assets/image/icons/sad.svg';
import Button from '../Button';

interface Product {
  id: string;
  name: string;
  amount: string;
  measurename: string
}

interface BodyListProps {
  view: string;
  products: Product[];
  hasError: boolean;
  isLoading: boolean;
  onLoadeProducts: () => void;
}

export default function BodyList({
  view, products, hasError, isLoading, onLoadeProducts,
}: BodyListProps) {
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight - window.innerHeight);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, []]);

  function handleTryAgain() {
    onLoadeProducts();
  }

  return (
    <S.Container view={view}>
      <Loader isLoading={isLoading} />

      {hasError && !isLoading && (
      <S.ErrorContainer>
        <img src={Sad} alt="Sad" />

        <div className="details">
          <strong>Ocorreu um erro ao obter os suas listas!</strong>
          <Button type="button" handleClick={() => handleTryAgain()}>Tentar novamente</Button>
        </div>
      </S.ErrorContainer>
      )}

      {!hasError && !isLoading && (
        <>
          {products.length < 1 && (
            <S.EmptyList>
              <img src={Empty} alt="vazio" />
              <p>Lista vazia, adicione itens no botão <strong>”Adicionar”</strong>.</p>
            </S.EmptyList>
          )}

          {products.map((product) => (
            <S.Card key={product.id} view={view}>
              <S.Content>
                <S.Title view={view}>{product.name}</S.Title>

                <S.Image view={view}>
                  <img src={Apple} alt="Maçã" />
                </S.Image>

                <S.ContainerValue view={view}>
                  <div className="values">
                    <span>
                      {`${product.amount} ${product.measurename || 'Medida'}`}
                    </span>
                    <span>R$ 7,50</span>
                  </div>

                  <div className="total">
                    <span>R$ 15,00</span>
                  </div>
                </S.ContainerValue>

                <S.Trash>
                  <button type="button">
                    <img src={Trash} alt="Lixeira" />
                  </button>
                </S.Trash>
              </S.Content>
            </S.Card>
          ))}
        </>
      )}
    </S.Container>
  );
}

BodyList.propTypes = {
  view: PropTypes.string.isRequired,

  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    quant: PropTypes.string,
  })).isRequired,

  hasError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
