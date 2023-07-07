import {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { useParams, useHistory } from 'react-router-dom';

import ListService from '../../services/ListService';
import ProductService from '../../services/ProductService';

import toast from '../../utils/toast';

interface ProductProps {
  id: string;
  name: string;
  value: number;
  amount: number;
  total: number;
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
  total?: string;
  measureId?: string;
  image?: string
}

interface ProductModalRef {
  setFieldValues: (product: FormData) => void;
  resetFields: () => void
}

export default function useList() {
  const [view, setView] = useState('flex');
  const [orderBy, setOrderBy] = useState('created_at');
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [list, setList] = useState({
    estimated: 0, name: '', id: '', total: 0,
  });
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
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
      setIsLoading(true);

      const listProducts = await ProductService.listProducts({ id, token, orderBy });

      setHasError(false);

      setProducts(listProducts);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [id, orderBy, token]);
  useEffect(() => {
    loadeProducts();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => { };
  }, [loadeProducts, submitting]);

  const loadeList = useCallback(async () => {
    try {
      if (token) {
        const getList = await ListService.getList({ id, token });
        setList(getList);
      }
    } catch (error) {
      history.push('/mylists');
    }
  }, [id, token, history]);
  useEffect(() => {
    loadeList();
  }, [loadeList, products]);

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

  function handleCloseModal() {
    setIsVisible(false);
    setProductId('');
    modalFormRef.current?.resetFields();
  }

  function handleAddProduct() {
    setMode('Adicionar');
    setIsVisible(true);
  }

  const handleEditForm = (getproductId: string) => {
    setProductId(getproductId);
    setMode('Editar');
    setIsVisible(true);
  };

  const handleSubmit = async (formData: FormData) => {
    if (mode === 'Adicionar') {
      const product = {
        ...formData,
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
        ...formData,
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

  return {
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
  };
}
