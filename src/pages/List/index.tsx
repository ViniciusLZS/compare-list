import { Link } from 'react-router-dom';

import * as S from './styles';

import BodyList from '../../components/BodyList';
import PageHeader from '../../components/PageHeader';
import ProgressBar from '../../components/ProgressBar';
import Button from '../../components/Button';
import ProductModal from './components/ProductModal';
import useList from './useList';

export default function List() {
  const {
    isVisible,
    modalFormRef,
    handleCloseModal,
    handleSubmit,
    mode,
    list,
    handleOrderBy,
    handleView,
    view,
    orderBy,
    disabledOrderButton,
    hasError,
    products,
    loadeProducts,
    isLoading,
    handleEditForm,
    handleDeleteContact,
    handleAddProduct,
  } = useList();

  return (
    <>

      <ProductModal
        ref={modalFormRef}
        isVisible={isVisible}
        handleCloseModal={() => handleCloseModal()}
        onSubmit={handleSubmit}
        mode={mode}
      />

      <S.Header>
        <ProgressBar list={list} />

        <PageHeader
          onHandleOrderBy={() => handleOrderBy()}
          onHandleView={() => handleView()}
          view={view}
          orderBy={orderBy}
          list={list}
          disabledOrderButton={disabledOrderButton}
          hasError={hasError}
        />
      </S.Header>

      <S.Content>
        <BodyList
          view={view}
          products={products}
          onLoadeProducts={loadeProducts}
          hasError={hasError}
          isLoading={isLoading}
          onEditForm={(getproductId: string) => handleEditForm(getproductId)}
          onDeleteProduct={(deleteProductId) => handleDeleteContact(deleteProductId)}
        />

        {!isLoading && (
        <S.ButtonContainer>
          <Link to="/mylists"><Button type="button">Feito!</Button></Link>
          <Button type="button" onClick={() => handleAddProduct()}>Adicionar</Button>
        </S.ButtonContainer>
        )}
      </S.Content>
    </>
  );
}
