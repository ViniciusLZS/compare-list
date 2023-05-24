import { useHistory } from 'react-router-dom';

import ListService from '../../services/ListService';

import FormNewList from '../../components/Forms/FormNewList';

export default function NewList() {
  const history = useHistory();
  const token = window.localStorage.getItem('token');

  const handleSubmit = async (formData) => {
    try {
      const newList = await ListService.createList({ formData, token });

      history.push(`/list/${newList.id}`);
    } catch {
      console.log('Ocorreu um erro ao cadastrar um contato!');
    }
  };

  return (
    <FormNewList onSubmit={handleSubmit} />
  );
}
