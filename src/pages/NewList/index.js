import { useHistory } from 'react-router-dom';
import FormNewList from '../../components/FormNewList';
import StoreService from '../../services/StoreService';

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
