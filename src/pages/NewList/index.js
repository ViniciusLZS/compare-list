import { useHistory } from 'react-router-dom';

import ListService from '../../services/ListService';

import FormNewList from '../../components/Forms/FormNewList';

export default function NewList() {
  const history = useHistory();
  const token = window.localStorage.getItem('token');

  const handleSubmit = async (formData) => {
    try {
      const newStore = await ListService.createList({ formData, token });

      history.push(`/list/${newStore.id}`);
    } catch {
      console.log('Ocorreu um erro ao cadastrar um contato!');
    }
  };

  return (
    <FormNewList onSubmit={handleSubmit} />
  );
}
