/* eslint-disable react/jsx-one-expression-per-line */
import { Link } from 'react-router-dom';

import * as S from './styles';

import maskMoney from '../../utils/maskMoney';
import formatDate from '../../utils/formatDate';

import useMyList from './useMyList';

import Button from '../../components/Button';
import Loader from '../../components/Loader';
import ContainerModal from '../../components/Modal/ContainerModal';

import Calendar from '../../assets/image/icons/calendar.svg';
import Trash from '../../assets/image/icons/bin.svg';
import Arrow from '../../assets/image/icons/arrow.svg';
import Empty from '../../assets/image/empty-box.svg';
import Sad from '../../assets/image/icons/sad.svg';
import Edit from '../../assets/image/icons/edit.svg';
import ModalEdit from './components/ModalEdit';

export default function MyLists() {
  const {
    modalFormRef,
    lists,
    orderBy,
    hasError,
    listBeingDeleted,
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    isEditModalVisible,
    handleToogleOrderBy,
    handleTryAgain,
    handleEditProduct,
    handleDeleteProduct,
    handleConfirmDeleteList,
    handleCloseDeleteModal,
    onSubmit,
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

      <ModalEdit
        ref={modalFormRef}
        isLoading={isLoadingDelete}
        isModalVisible={isEditModalVisible}
        onCloseModal={handleCloseDeleteModal}
        onSubmit={onSubmit}
      />

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
        {lists.length > 0 && (
        <strong>
          {lists.length}
          {lists.length === 1 ? ' Lista' : ' Listas'}
        </strong>
        )}

        {lists?.length > 0 && (
        <S.ListHeader orderBy={orderBy}>
          <button type="button" onClick={handleToogleOrderBy}>
            <span>Data</span>
            <img src={Arrow} alt="Seta" />
          </button>
        </S.ListHeader>
        )}
      </S.Header>

      {(lists && !hasError) && !isLoading && (
        <>

          {lists.length < 1 && (
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
            {lists.map((item) => (
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
                        <span>{item.total ? maskMoney(item.total.toString()) : 'R$ 0,00'}</span>
                      </S.Value>

                    </S.Info>
                  </Link>

                  <S.Trash>
                    <button type="button" onClick={() => handleEditProduct(item)}>
                      <img src={Edit} alt="Editar" />
                    </button>

                    <button type="button" onClick={() => handleDeleteProduct(item)}>
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
