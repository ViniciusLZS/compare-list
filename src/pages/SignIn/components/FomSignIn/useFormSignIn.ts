import {
  useContext, useState, ChangeEvent, FormEvent,
} from 'react';

import useErrors from '../../../../hooks/useErrors';
import isEmailValid from '../../../../utils/isEmailValid';

import { AuthContext } from '../../../../context/AuthContext';

export default function useFormSignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors, setError, removeError, getErrorMessageFieldName,
  } = useErrors();

  const isFormValid = (email && password && errors.length === 0);

  const authContext = useContext(AuthContext);
  const { userLogin } = authContext || {};

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      removeError('email');
      setError({ field: 'email', message: 'E-mail é invalido' });
    } else if (!event.target.value) {
      removeError('email');
      setError({ field: 'email', message: 'E-mail é obrigatório' });
    } else {
      removeError('email');
    }
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);

    if (!event.target.value) {
      setError({ field: 'password', message: 'Senha é obrigatória' });
    } else {
      removeError('password');
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);

    if (userLogin) {
      await userLogin({
        email,
        password,
      });
    }

    setIsSubmitting(false);
  }

  return {
    handleSubmit,
    getErrorMessageFieldName,
    email,
    handleEmailChange,
    handlePasswordChange,
    password,
    isSubmitting,
    isFormValid,
  };
}
