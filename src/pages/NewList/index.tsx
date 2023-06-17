import { useHistory } from 'react-router-dom';

import ListService from '../../services/ListService';

import FormNewList from '../../components/Forms/FormNewList';
import toast from '../../utils/toast';

interface ListProps {
  name: string;
  estimated: string;
}
export default function NewList() {
  const history = useHistory();
  const token = window.localStorage.getItem('token') ?? '';

  const handleSubmit = async (list: ListProps) => {
    try {
      const newList = await ListService.createList({ list, token });

      toast({
        type: 'success',
        text: 'Lista criada com sucesso!',
        duration: 5000,
      });

      history.push(`/list/${newList.id}`);
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao criar à lista!',
      });
    }
  };

  return (
    <FormNewList onSubmit={handleSubmit} />
  );
}
