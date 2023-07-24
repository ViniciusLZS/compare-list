import {
  ChangeEvent, FormEvent, useContext, useState,
} from 'react';
import useErrors from '../../hooks/useErrors';
import isEmailValid from '../../utils/isEmailValid';
import { AuthContext } from '../../context/AuthContext';
import UserService from '../../services/UserService';
import toast from '../../utils/toast';

export default function useUserData() {
  const authContext = useContext(AuthContext);
  const { user, getToken } = authContext || {};

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors, setError, removeError, getErrorMessageFieldName,
  } = useErrors();

  const token = localStorage.getItem('token') || '';

  const isFormValid = (name && email && errors.length === 0);

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      if (name && email) {
        await UserService.UpdateData(token, { name, email });
      }

      if (getToken) {
        getToken(token);
      }

      toast({
        type: 'success',
        text: 'Dados alterados com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao alterar os dados!',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    handleSubmit,
    getErrorMessageFieldName,
    name,
    handleNameChange,
    isSubmitting,
    email,
    handleEmailChange,
    isFormValid,
  };
}
