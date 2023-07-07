import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import ListService from '../../services/ListService';
import toast from '../../utils/toast';

interface ListBeingProps {
  id: string;
  name: string;
  estimated: number;
  total: number;
}

interface ListProps {
  id: string;
  name: string;
  estimated: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: string;
}

interface FormEditProps {
  name: string;
  estimated: string;
}

interface FormDataProps {
  id: string;
  name: string;
  estimated: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: string;
}

interface ProductModalRef {
  setFieldValues: (listEdit: FormDataProps) => void;
  resetFields: () => void
}

export default function useMyList() {
  const [lists, setLists] = useState<ListProps[]>([]);
  const [list, setList] = useState<ListProps | null>(null);
  const [orderBy, setOrderBy] = useState('asc');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(true);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [mounted, setMounted] = useState(true);

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [listBeingDeleted, setListBeingDeleted] = useState<ListBeingProps | null>(null);

  const modalFormRef = useRef<ProductModalRef | null>(null);

  const token = localStorage.getItem('token') ?? '';

  const loaderList = useCallback(async () => {
    try {
      setIsLoading(true);

      const listAll = await ListService.listAll({ orderBy, token });

      if (mounted) {
        setLists(listAll);
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
  }, [loaderList, submitting]);

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

  useEffect(() => {
    let isMounted = true;
    async function loaderGetProduct() {
      try {
        if (list) {
          const listEdit = await ListService.getList({ id: list.id, token });
          if (isMounted) {
            modalFormRef.current?.setFieldValues(listEdit);
          }
        }
      } catch (error) {
        if (isMounted) {
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
  }, [list, token]);

  function handleEditProduct(listEdit: ListProps) {
    modalFormRef.current?.setFieldValues(listEdit);
    setList(listEdit);
    setIsEditModalVisible(true);
  }

  function handleDeleteProduct(product: ListProps) {
    setListBeingDeleted(product);
    setIsDeleteModalVisible(true);
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setIsEditModalVisible(false);

    setListBeingDeleted(null);
  };

  async function onSubmit(formData: FormEditProps) {
    try {
      setIsLoadingDelete(true);
      if (list) {
        setSubmitting(true);
        await ListService.editList({ formData, token, id: list.id });
      }

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
      setSubmitting(false);
      setIsLoadingDelete(false);
    }
  }

  const handleConfirmDeleteList = async () => {
    try {
      setIsLoadingDelete(true);
      if (listBeingDeleted) {
        await ListService.deleteList({ id: listBeingDeleted.id, token });
      }

      setLists((prevState) => prevState.filter(
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

  return {
    modalFormRef,
    lists,
    list,
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
  };
}
