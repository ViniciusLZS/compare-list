import {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { useParams, Link, useHistory } from 'react-router-dom';

import * as S from './styles';

import ListService from '../../services/ListService';

import toast from '../../utils/toast';

import BodyList from '../../components/BodyList';
import PageHeader from '../../components/PageHeader';
import ProgressBar from '../../components/ProgressBar';
import Button from '../../components/Button';
import ProductService from '../../services/ProductService';
import ProductModal from '../../components/Modal/ProductModal';

interface ProductProps {
  id: string;
  name: string;
  value: number;
  amount: number;
  measureName: string
  image: string;
}

interface ListParams {
  id: string;
}

interface FormData {
  name: string;
  value?: string;
  amount?: string
  measureId?: string;
  image?: string
}

interface ProductModalRef {
  setFieldValues: (product: FormData) => void;
  resetFields: () => void
}

export default function List() {
  const [view, setView] = useState('flex');
  const [orderBy, setOrderBy] = useState('created_at');
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [list, setList] = useState({ estimated: 0, name: '', id: '' });
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [disabledOrderButton, setDisabledOrderButton] = useState(false);
  const [productId, setProductId] = useState('');
  const [mode, setMode] = useState('');

  const { id } = useParams<ListParams>();
  const token = localStorage.getItem('token') ?? '';
  const modalFormRef = useRef<ProductModalRef | null>(null);
  const history = useHistory();

  const loadeProducts = useCallback(async () => {
    try {
      if (token) {
        const getList = await ListService.getList({ id, token });
        setList(getList);
      }
    } catch (error) {
      history.push('/mylist');
    }

    try {
      setIsLoading(true);

      const listProducts = await ProductService.listProducts({ id, token, orderBy });

      setHasError(false);

      setProducts(listProducts);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [id, orderBy, token, history]);

  useEffect(() => {
    loadeProducts();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [loadeProducts, submitting]);

  useEffect(() => {
    let isMounted = true;
    async function loaderGetProduct() {
      try {
        if (productId) {
          const product = await ProductService.getProduct({ productId, token });
          if (isMounted) {
            modalFormRef.current?.setFieldValues(product);
          }
        }
      } catch (error) {
        if (isMounted) {
          history.push('/list');
          toast({
            type: 'danger',
            text: 'Produto não encontrado',
          });
        }
      }
    }
    loaderGetProduct();

    return () => {
      isMounted = false;
    };
  }, [productId, token, history]);

  useEffect(() => {
    if (submitting || hasError || products.length < 1) {
      setDisabledOrderButton(true);
    } else {
      setDisabledOrderButton(false);
    }
  }, [submitting, hasError, products]);

  function handleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'created_at' ? 'name' : 'created_at'),
    );
  }

  function handleView() {
    setView(
      (prevState) => (prevState === 'flex' ? 'grid' : 'flex'),
    );
  }

  function handleModal() {
    setModal((prevState) => !prevState);
    if (modal === true) {
      setProductId('');
    }
  }

  function handleAddProduct() {
    setMode('Adicionar');
    handleModal();
  }

  const handleEditForm = (getproductId: string) => {
    setProductId(getproductId);
    setMode('Editar');
    handleModal();
  };

  const handleSubmit = async (formData: FormData) => {
    if (mode === 'Adicionar') {
      const product = {
        name: formData.name,
        value: formData.value,
        amount: formData.amount,
        measureId: formData.measureId,
        image: formData.image,
        listId: list.id,
      };
      try {
        setSubmitting(true);
        await ProductService.createProduct({ product, token });
        setSubmitting(false);
        toast({
          type: 'success',
          text: 'Produto adicionado com sucesso!',
          duration: 5000,
        });
        modalFormRef.current?.resetFields();
      } catch (error) {
        toast({
          type: 'danger',
          text: 'Ocorreu um erro ao adicionar o produto!',
          duration: 7000,
        });
      }
    }

    if (mode === 'Editar') {
      const product = {
        name: formData.name,
        value: formData.value,
        amount: formData.amount,
        measureId: formData.measureId,
        image: formData.image,
        listId: list.id,
      };
      try {
        setSubmitting(true);
        await ProductService.updateProduct({ productId, product, token });
        setSubmitting(false);
        toast({
          type: 'success',
          text: 'Produto editado com sucesso!',
          duration: 7000,
        });
      } catch (error) {
        toast({
          type: 'danger',
          text: 'Ocorreu um erro ao editar o produto!',
          duration: 7000,
        });
      }
    }
  };

  const handleDeleteContact = async (deleteProductId: string) => {
    try {
      await ProductService.deleteProduct(deleteProductId, token);

      setProducts((prevState) => prevState.filter(
        (item) => item.id !== deleteProductId,
      ));

      toast({
        type: 'success',
        text: 'Contato deletado com sucesso.',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar um contato.',
      });
    }
  };

  return (
    <>
      {modal && (
        <ProductModal
          ref={modalFormRef}
          modal={modal}
          handleModal={() => handleModal()}
          onSubmit={handleSubmit}
          mode={mode}
        />
      )}

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
          <Button type="button" handleClick={() => handleAddProduct()}>Adicionar</Button>
        </S.ButtonContainer>
        )}
      </S.Content>
    </>
  );
}
