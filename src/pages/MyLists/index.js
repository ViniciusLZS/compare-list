/* eslint-disable react/jsx-one-expression-per-line */
import { useCallback, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import * as S from './styles';

import maskMoney from '../../utils/maskMoney';
import formatDate from '../../utils/formatDate';

import Button from '../../components/Button';
import Loader from '../../components/Loader';

import Calendar from '../../assets/image/icons/calendar.svg';
import Trash from '../../assets/image/icons/bin.svg';
import Arrow from '../../assets/image/icons/arrow.svg';
import Empty from '../../assets/image/empty-box.svg';
import ListService from '../../services/ListService';
import Modal from '../../components/Modal';

export default function MyLists() {
  const [orderBy, setOrderBy] = useState('asc');
  const [hasError, setHasError] = useState(false);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [mounted, setMounted] = useState(true);

  const token = localStorage.getItem('token');

  const loaderList = useCallback(async () => {
    try {
      setIsLoading(true);

      const listAll = await ListService.listAll({ orderBy, token });

      if (mounted) {
        setList(listAll);
        setHasError(false);
      }
    } catch (error) {
      if (mounted) {
        setHasError(true);
      }
    } finally {
      if (mounted) {
        setIsLoading(false);
      }
    }
  }, [orderBy, token, mounted]);

  useEffect(() => {
    loaderList();

    return () => {
      setMounted(false);
    };
  }, [loaderList]);

  function handleToogleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  function handleDelete() {
    setModal(true);
  }

  return (
    <S.Container>
      <Loader isLoading={isLoading} />

      {modal && (
        <Modal
          danger
        >
          <h1>Deletar</h1>
        </Modal>
      )}

      {(list && !hasError) && !isLoading && (
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
                <S.Title>{item.name}</S.Title>

                <S.Content>
                  <Link to={`/list/${item.id}`}>
                    <S.Info>
                      <S.Date>
                        <img src={Calendar} alt="calendário" />
                        <span>{formatDate(item.created_at)}</span>
                      </S.Date>

                      <S.Value>
                        <span>{maskMoney(item.estimated.toString())}</span>
                      </S.Value>

                    </S.Info>
                  </Link>

                  <S.Trash>
                    <button type="button" onClick={handleDelete}>
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
