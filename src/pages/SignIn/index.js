// import { useContext } from 'react';

// import { useHistory } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';

import FormSignIn from '../../components/Forms/FomSignIn';
// import UserService from '../../services/UserService';

export default function SignIn() {
  // const { setLogin } = useContext(AuthContext);
  // const history = useHistory();

  // const handleSubmit = async (formData) => {
  //   try {
  //     const response = await UserService.login(formData);
  //     const { token } = await response.json();

  //     window.localStorage.setItem('token', token);

  //     history.push(`/profile/${response.token}`);
  //   } catch (error) {
  //     setLogin(false);
  //     console.log({ error });
  //   }
  // };

  return (
    <FormSignIn />
  );
}
