import { useHistory } from 'react-router-dom';

import StoreService from '../../services/StoreService';

import FormNewList from '../../components/Forms/FormNewList';

export default function NewList() {
  const history = useHistory();

  const handleSubmit = async (formData) => {
    try {
      const newStore = await StoreService.createStore(formData);

      history.push(`/list/${newStore.id}`);
    } catch {
      console.log('Ocorreu um erro ao cadastrar um contato!');
    }
  };

  return (
    <FormNewList onSubmit={handleSubmit} />
  );
}
