/* eslint-disable react/jsx-one-expression-per-line */

import * as S from './styles';

import maskMoney from '../../utils/maskMoney';

import Loader from '../Loader';

import imageNotFound from '../../assets/image/imageNotFound.svg';

import Trash from '../../assets/image/icons/bin.svg';
import Empty from '../../assets/image/empty-box.svg';
import Sad from '../../assets/image/icons/sad.svg';
import Button from '../Button';
import ContainerModal from '../Modal/ContainerModal';
import useBodyList from './useBodyList';

interface Product {
  id: string;
  name: string;
  value: number;
  amount: number;
  total: number;
  measureName: string
  image: string;
}

interface BodyListProps {
  view: string;
  products: Product[];
  hasError: boolean;
  isLoading: boolean;
  onLoadeProducts: () => void;
  onEditForm: (getproductId: string) => void;
  onDeleteProduct: (productId: string) => Promise<void>;
}

export default function BodyList({
  view, products, hasError, isLoading, onLoadeProducts, onEditForm, onDeleteProduct,
}: BodyListProps) {
  const {
    isLoadingDelete,
    isDeleteModalVisible,
    handleTryAgain,
    editForm,
    handleDeleteproduct,
    handleConfirmDeleteProduct,
    productBeingDeleted,
    handleCloseDeleteModal,
  } = useBodyList({
    view,
    onLoadeProducts,
    onEditForm,
    onDeleteProduct,
  });

  return (
    <S.Container view={view}>
      <Loader isLoading={isLoading} />

      <ContainerModal
        danger
        isLoading={isLoadingDelete}
        visible={isDeleteModalVisible}
        title={`Tem certeza que deseja remover ”${productBeingDeleted?.name}” ?`}
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteProduct}
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
              <S.Content view={view}>
                <button type="button" onClick={() => editForm(product.id)}>
                  <S.Title view={view}>{product.name}</S.Title>

                  <S.Image view={view}>
                    <img
                      src={product.image
                        ? `${product.image}`
                        : imageNotFound}
                      alt=""
                    />
                  </S.Image>

                  <S.ContainerValue view={view}>
                    <div className="values">
                      <span>
                        {`${product.amount} ${product.measureName || 'Medida'}`}
                      </span>
                      <span>{product.value !== null ? maskMoney(product.value.toString()) : 'R$ 0,00'}</span>
                    </div>

                    <div className="total">
                      <span>{product.total !== null ? maskMoney(product.total.toString()) : 'R$ 0,00'}</span>
                    </div>
                  </S.ContainerValue>
                </button>
                <S.Trash>
                  <button type="button" onClick={() => handleDeleteproduct(product)}>
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
