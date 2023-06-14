/* eslint-disable react/jsx-one-expression-per-line */
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as S from './styles';

import ListService from '../../services/ListService';

import maskMoney from '../../utils/maskMoney';
import formatDate from '../../utils/formatDate';

import Button from '../../components/Button';
import Loader from '../../components/Loader';

import Calendar from '../../assets/image/icons/calendar.svg';
import Trash from '../../assets/image/icons/bin.svg';
import Arrow from '../../assets/image/icons/arrow.svg';
import Empty from '../../assets/image/empty-box.svg';
import Sad from '../../assets/image/icons/sad.svg';
import ContainerModal from '../../components/Modal/ContainerModal';
import toast from '../../utils/toast';

interface ListProps {
  id: string;
  name: string;
  estimated: number;
}

export default function MyLists() {
  const [list, setList] = useState<{
    // eslint-disable-next-line camelcase
    id: string; name: string; created_at: string; estimated: number; }[]>([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [mounted, setMounted] = useState(true);

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [listBeingDeleted, setListBeingDeleted] = useState<ListProps | null>(null);

  const token = localStorage.getItem('token') ?? '';

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
  }, [loaderList]);

  useEffect(() => () => {
    setMounted(false);
  }, []);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight - window.innerHeight);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [[]]);

  function handleToogleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  function handleTryAgain() {
    loaderList();
  }

  function handleDeleteproduct(product: ListProps) {
    setListBeingDeleted(product);
    setIsDeleteModalVisible(true);
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setListBeingDeleted(null);
  };

  const handleConfirmDeleteList = async () => {
    try {
      setIsLoadingDelete(true);
      if (listBeingDeleted) {
        await ListService.deleteList({ id: listBeingDeleted.id, token });
      }

      setList((prevState) => prevState.filter(
        (item) => item.id !== listBeingDeleted?.id,
      ));

      handleCloseDeleteModal();

      toast({
        type: 'success',
        text: 'Lista deletada com sucesso.',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar a lista.',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  };

  return (
    <S.Container>
      <Loader isLoading={isLoading} />

      <ContainerModal
        danger
        isLoading={isLoadingDelete}
        visible={isDeleteModalVisible}
        title={`Tem certeza que deseja remover a lista ”${listBeingDeleted?.name}”?`}
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteList}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </ContainerModal>

      {hasError && !isLoading && (
      <S.ErrorContainer>
        <img src={Sad} alt="Sad" />

        <div className="details">
          <strong>Ocorreu um erro ao obter os suas listas!</strong>
          <Button type="button" handleClick={() => handleTryAgain()}>Tentar novamente</Button>
        </div>
      </S.ErrorContainer>
      )}

      <S.Header>
        {list.length > 0 && (
        <strong>
          {list.length}
          {list.length === 1 ? ' Lista' : ' Listas'}
        </strong>
        )}

        {list?.length > 0 && (
        <S.ListHeader orderBy={orderBy}>
          <button type="button" onClick={handleToogleOrderBy}>
            <span>Data</span>
            <img src={Arrow} alt="Seta" />
          </button>
        </S.ListHeader>
        )}
      </S.Header>

      {(list && !hasError) && !isLoading && (
        <>

          {list.length < 1 && (
            <S.EmptyList>
              <img src={Empty} alt="vazio" />

              <p>Lista vazia, adicione itens no botão <strong>”Começar”</strong>.</p>

              <Link to="/newlist">
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
                    <button type="button" onClick={() => handleDeleteproduct(item)}>
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
