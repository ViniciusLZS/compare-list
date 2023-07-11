import FormNewList from './components/FormNewList';
import useNewList from './useNewList';

export default function NewList() {
  const { handleSubmit } = useNewList();

  return (
    <FormNewList onSubmit={handleSubmit} />
  );
}
