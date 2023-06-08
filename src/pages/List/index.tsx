import {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { useParams, Link } from 'react-router-dom';

import * as S from './styles';

import ListService from '../../services/ListService';

import toast from '../../utils/toast';

import BodyList from '../../components/BodyList';
import PageHeader from '../../components/PageHeader';
import ProgressBar from '../../components/ProgressBar';
import Button from '../../components/Button';
import ProductService from '../../services/ProductService';
import ProductModal from '../../components/Modal/ProductModal';

interface ListParams {
  id: string;
}

interface FormData {
  name: string;
  value?: string;
  amount?: string
  measuresId?: string;
  image?: string
}

interface ProductModalRef {
  setFieldValues: (product: FormData) => void;
  resetFields: () => void
}

export default function List() {
  const [view, setView] = useState('flex');
  const [orderBy, setOrderBy] = useState('created_at');
  const [products, setProducts] = useState([]);
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

  const loadeProducts = useCallback(async () => {
    try {
      if (token) {
        const getList = await ListService.getList({ id, token });
        setList(getList);
      }
    } catch (error) {
      // history.push('/mylist');
    }

    try {
      setIsLoading(true);

      const listProducts = await ProductService.listProducts({ id, token, orderBy });

      setHasError(false);

      setProducts(listProducts);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [id, orderBy, token]);

  useEffect(() => {
    loadeProducts();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [loadeProducts, submitting]);

  const loadGetProduct = useCallback(async () => {
    try {
      if (productId) {
        const product = await ProductService.getProduct({ productId, token });

        modalFormRef.current?.setFieldValues(product);
      }
    } catch (error) {
      // history.push('/');
      toast({
        type: 'danger',
        text: 'Produto não encontrado',
      });
    }
  }, [productId, token]);

  useEffect(() => {
    loadGetProduct();
  }, [loadGetProduct]);

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
      const formDatas = {
        name: formData.name,
        value: formData.value,
        amount: formData.amount,
        measureId: formData.measuresId,
        image: formData.image,
        listId: list.id,
      };
      try {
        setSubmitting(true);
        await ProductService.createProduct({ formDatas, token });
        setSubmitting(false);
        toast({
          type: 'success',
          text: 'Producto adicionado com sucesso!',
          duration: 7000,
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
      const formDatas = {
        name: formData.name,
        value: formData.value,
        amount: formData.amount,
        measureId: formData.measuresId,
        image: formData.image,
        listId: list.id,
      };
      try {
        setSubmitting(true);
        await ProductService.updateProduct({ productId, formDatas, token });
        setSubmitting(false);
        toast({
          type: 'success',
          text: 'Producto editado com sucesso!',
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
