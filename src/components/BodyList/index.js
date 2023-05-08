import { useEffect } from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

import Apple from '../../assets/image/apple.svg';
import Trash from '../../assets/image/icons/bin.svg';

export default function BodyList({ view, products }) {
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight - window.innerHeight);
  }, [view]);

  return (
    <S.Container view={view}>
      {products.map((product) => (
        <S.Card key={product.id} view={view}>
          <S.Content view={view}>
            <S.Title view={view}>{product.name}</S.Title>

            <S.Image view={view}>
              <img src={Apple} alt="Maçã" />
            </S.Image>

            <S.ContainerValue view={view}>
              <div className="values">
                <span>
                  {`${product.quant} Unid.`}
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
};
