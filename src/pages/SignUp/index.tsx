import { useHistory } from 'react-router-dom';

import UserService from '../../services/UserService';

import FormSignUp from '../../components/Forms/FormSignUp';

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function SingUp() {
  const history = useHistory();

  const handleSubmit = async (formData: FormData) => {
    try {
      await UserService.createUser(formData);

      history.push('/signin');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormSignUp onHandleSubmit={handleSubmit} />
  );
}
