/* eslint-disable react/jsx-one-expression-per-line */
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import * as S from './styles';

import Calendar from '../../assets/image/icons/calendar.svg';
import Trash from '../../assets/image/icons/bin.svg';
import Arrow from '../../assets/image/icons/arrow.svg';
import StoreService from '../../services/StoreService';
import Empty from '../../assets/image/empty-box.svg';

import maskMoney from '../../utils/maskMoney';
import Button from '../../components/Button';

export default function MyLists() {
  const [orderBy, setOrderBy] = useState('asc');
  const [hasError, setHasError] = useState(false);
  const [list, setList] = useState([]);
  console.log('🚀 ~ file: index.js:16 ~ MyLists ~ list:', list);

  useEffect(() => {
    async function loaderList() {
      try {
        const listStore = await StoreService.listsStore();

        setHasError(false);

        setList(listStore);
      } catch (error) {
        setHasError(true);
        console.log('error', error);
      }
    }
    loaderList();
  }, []);

  function handleToogleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  return (
    <S.Container>
      {!hasError && (
        <>
          <S.Header>
            {list.length > 0 && (
              <strong>
                {list.length}
                {list.length === 1 ? ' Lista' : ' Listas'}
              </strong>
            )}

            {list.length > 0 && (
              <S.ListHeader orderBy={orderBy}>
                <button type="button" onClick={handleToogleOrderBy}>
                  <span>Nome</span>
                  <img src={Arrow} alt="Seta" />
                </button>
              </S.ListHeader>
            )}
          </S.Header>

          {list.length < 1 && (
            <S.EmptyList>
              <img src={Empty} alt="vazio" />

              <p>Lista vazia, adicione itens no botão <strong>”Começar”</strong>.</p>

              <Link to="/new">
                <Button>
                  Começar
                </Button>
              </Link>
            </S.EmptyList>
          )}

          <S.List>
            {list.map((item) => (
              <S.Card key={item.id}>
                <S.Title>{item.store}</S.Title>

                <S.Content>
                  <Link to={`/list/${item.id}`}>
                    <S.Info>
                      <S.Data>
                        <img src={Calendar} alt="calendário" />
                        <span>12 Jan 2023</span>
                      </S.Data>

                      <S.Value>
                        <span>{maskMoney(item.estimated)}</span>
                      </S.Value>

                    </S.Info>
                  </Link>

                  <S.Trash>
                    <button type="button">
                      <img src={Trash} alt="Lixeira" />
                    </button>
                  </S.Trash>
                </S.Content>
              </S.Card>
            ))}
          </S.List>
        </>
      )}
    </S.Container>
  );
}
