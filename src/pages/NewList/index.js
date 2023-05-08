import { useHistory } from 'react-router-dom';

import StoreService from '../../services/StoreService';

import FormNewList from '../../components/FormNewList';

export default function NewList() {
  const history = useHistory();

  const handleSubmit = async (formData) => {
    const newStore = await StoreService.createStore(formData);

    history.push(`/list/${newStore.id}`);
  };

  return (
    <FormNewList onSubmit={handleSubmit} />
  );
}
