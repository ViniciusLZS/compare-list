import { useHistory } from 'react-router-dom';
import FormNewList from '../../components/FormNewList';

export default function NewList() {
  const history = useHistory();

  const handleSubmit = async (formData) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };
    const response = await fetch('https://64530c54bce0b0a0f7547089.mockapi.io/comparelist/v1/newlist', requestOptions);
    const json = await response.json();

    history.push(`/list/${json.id}`);

    console.log('🚀 ~ file: index.js:34 ~ handleSubmit ~ data:', json);
  };

  return (
    <FormNewList onSubmit={handleSubmit} />
  );
}
