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
  const [orderBy, setOrderBy] = useState('desc');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(true);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCompareModalVisible, setIsCompareModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isMenuOptionsVisible, setIsMenuOptionsVisible] = useState('');

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [listBeingDeleted, setListBeingDeleted] = useState<ListBeingProps | null>(null);
  const [listCompate, setListCompate] = useState <ListProps[]>([]);
  const [elementSelectCompate, setElementSelectCompate] = useState<HTMLElement []>([]);

  const modalFormRef = useRef<ProductModalRef | null>(null);

  const token = localStorage.getItem('token') ?? '';

  const loaderList = useCallback(async (signal?: any) => {
    try {
      setIsLoading(true);

      const listAll = await ListService.listAll({ orderBy, token, signal });

      setLists(listAll);
      setHasError(false);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy, token]);

  useEffect(() => {
    const controller = new AbortController();

    loaderList(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loaderList, submitting]);

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

  useEffect(() => {
    elementSelectCompate.forEach((element) => {
      element.classList.add('select');
    });

    if (listCompate.length === 0) {
      elementSelectCompate.forEach((element) => {
        element.classList.remove('select');
        setElementSelectCompate([]);
      });
    }
  }, [elementSelectCompate, listCompate]);

  function handleToogleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  function handleTryAgain() {
    loaderList();
  }

  function handleMenuOptions(id: string) {
    setIsMenuOptionsVisible((prevState) => (prevState === id ? '' : id));
  }

  function handleEditList(listEdit: ListProps) {
    modalFormRef.current?.setFieldValues(listEdit);
    setList(listEdit);
    setIsEditModalVisible(true);
  }

  function handleCompareList(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    listCompare: ListProps,
  ) {
    const parentDiv = event.currentTarget.parentNode;
    const grandparentElement = parentDiv?.parentNode?.parentElement;
    if (grandparentElement) {
      setElementSelectCompate((prevState) => [...prevState, grandparentElement]);
    }

    setListCompate((prevState) => [...prevState, listCompare]);

    setIsCompareModalVisible(true);
  }

  function handleCloseCompareModal() {
    setIsCompareModalVisible(false);
    setListCompate([]);
  }

  function handleDeleteList(listDelete: ListProps) {
    setListBeingDeleted(listDelete);
    setIsDeleteModalVisible(true);
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setIsEditModalVisible(false);

    setListBeingDeleted(null);
  };

  async function handleEditSubmit(formData: FormEditProps) {
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
    listCompate,
    listBeingDeleted,
    isLoading,
    isLoadingDelete,
    isEditModalVisible,
    isCompareModalVisible,
    isDeleteModalVisible,
    isMenuOptionsVisible,
    handleToogleOrderBy,
    handleTryAgain,
    handleMenuOptions,
    handleEditList,
    handleCompareList,
    handleDeleteList,
    handleConfirmDeleteList,
    handleCloseCompareModal,
    handleCloseDeleteModal,
    handleEditSubmit,
  };
}
