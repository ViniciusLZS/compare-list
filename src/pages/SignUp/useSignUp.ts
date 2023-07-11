import { useHistory } from 'react-router-dom';
import UserService from '../../services/UserService';
import toast from '../../utils/toast';

interface UserProps {
  name: string;
  email: string;
  password: string;
}

export default function useSignUp() {
  const history = useHistory();

  const handleSubmit = async (User: UserProps) => {
    try {
      await UserService.createUser(User);

      toast({
        type: 'success',
        text: 'Cadastrado com sucesso!',
      });
      history.push('/signin');
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o usúario!',
      });
    }
  };

  return { handleSubmit };
}
