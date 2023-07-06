/* eslint-disable react/jsx-one-expression-per-line */
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
import Sad from '../../assets/image/icons/sad.svg';
import ContainerModal from '../../components/Modal/ContainerModal';
import useMyList from './useMyList';

export default function MyLists() {
  const {
    list,
    hasError,
    isLoading,
    orderBy,
    isLoadingDelete,
    isDeleteModalVisible,
    handleToogleOrderBy,
    handleTryAgain,
    handleDeleteproduct,
    handleConfirmDeleteList,
    listBeingDeleted,
    handleCloseDeleteModal,
  } = useMyList();

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
                        <span>{formatDate(item.createdAt)}</span>
                      </S.Date>

                      <S.Value>
                        <span>{maskMoney(item.total.toString())}</span>
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
