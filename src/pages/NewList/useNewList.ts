import { useNavigate } from 'react-router-dom';
import ListService from '../../services/ListService';
import toast from '../../utils/toast';

interface ListProps {
  name: string;
  estimated: string;
}

export default function useNewList() {
  const navigate = useNavigate();
  const token = window.localStorage.getItem('token') ?? '';

  const handleSubmit = async (list: ListProps) => {
    try {
      const newList = await ListService.createList({ list, token });

      toast({
        type: 'success',
        text: 'Lista criada com sucesso!',
        duration: 5000,
      });

      navigate(`/list/${newList.id}`);
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao criar à lista!',
      });
    }
  };

  return { handleSubmit };
}
