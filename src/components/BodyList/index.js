import { useEffect } from 'react';
import * as S from './styles';

import Apple from '../../assets/image/apple.svg';
import Trash from '../../assets/image/icons/bin.svg';

export default function BodyList() {
  const layout = 'flex';

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight - window.innerHeight);
  }, []);

  return (
    <S.Container layout={layout}>
      <S.Card layout={layout}>
        <S.Content>
          <S.Title>Maçã</S.Title>

          <S.Image>
            <img src={Apple} alt="Maçã" />
          </S.Image>

          <S.ContainerValue>
            <div className="values">
              <span>2 Unid.</span>
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

      <S.Card>
        <S.Content>
          <S.Title>Maçã</S.Title>

          <S.Image>
            <img src={Apple} alt="Maçã" />
          </S.Image>

          <S.ContainerValue>
            <div className="values">
              <span>2 Unid.</span>
              <span>R$ 750,00</span>
            </div>

            <div className="total">
              <span>R$ 1.500,00</span>
            </div>
          </S.ContainerValue>

          <S.Trash>
            <button type="button">
              <img src={Trash} alt="Lixeira" />
            </button>
          </S.Trash>
        </S.Content>
      </S.Card>

      <S.Card>
        <S.Content>
          <S.Title>Maçã</S.Title>

          <S.Image>
            <img src={Apple} alt="Maçã" />
          </S.Image>

          <S.ContainerValue>
            <div className="values">
              <span>2 Unid.</span>
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

      <S.Card>
        <S.Content>
          <S.Title>Maçã</S.Title>

          <S.Image>
            <img src={Apple} alt="Maçã" />
          </S.Image>

          <S.ContainerValue>
            <div className="values">
              <span>2 Unid.</span>
              <span>R$ 750,00</span>
            </div>

            <div className="total">
              <span>R$ 1.500,00</span>
            </div>
          </S.ContainerValue>

          <S.Trash>
            <button type="button">
              <img src={Trash} alt="Lixeira" />
            </button>
          </S.Trash>
        </S.Content>
      </S.Card>

      <S.Card>
        <S.Content>
          <S.Title>Maçã</S.Title>

          <S.Image>
            <img src={Apple} alt="Maçã" />
          </S.Image>

          <S.ContainerValue>
            <div className="values">
              <span>2 Unid.</span>
              <span>R$ 750,00</span>
            </div>

            <div className="total">
              <span>R$ 1.500,00</span>
            </div>
          </S.ContainerValue>

          <S.Trash>
            <button type="button">
              <img src={Trash} alt="Lixeira" />
            </button>
          </S.Trash>
        </S.Content>
      </S.Card>

      <S.Card>
        <S.Content>
          <S.Title>Maçã</S.Title>

          <S.Image>
            <img src={Apple} alt="Maçã" />
          </S.Image>

          <S.ContainerValue>
            <div className="values">
              <span>2 Unid.</span>
              <span>R$ 750,00</span>
            </div>

            <div className="total">
              <span>R$ 1.500,00</span>
            </div>
          </S.ContainerValue>

          <S.Trash>
            <button type="button">
              <img src={Trash} alt="Lixeira" />
            </button>
          </S.Trash>
        </S.Content>
      </S.Card>

    </S.Container>
  );
}
