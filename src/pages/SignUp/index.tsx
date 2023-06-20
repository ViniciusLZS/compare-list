import FormSignUp from './componenets/FormSignUp';
import useSignUp from './useSignUp';

export default function SingUp() {
  const { handleSubmit } = useSignUp();

  return (
    <FormSignUp onHandleSubmit={handleSubmit} />
  );
}
