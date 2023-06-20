import { useCallback, useEffect, useState } from 'react';
import ListService from '../../services/ListService';
import toast from '../../utils/toast';

interface ListBeingProps {
  id: string;
  name: string;
  estimated: number;
}

interface ListProps {
  id: string;
  name: string;
  estimated: number;
  total: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: string;
}

export default function useMyList() {
  const [list, setList] = useState<ListProps[]>([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [mounted, setMounted] = useState(true);

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [listBeingDeleted, setListBeingDeleted] = useState<ListBeingProps | null>(null);

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

  return {
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
  };
}
