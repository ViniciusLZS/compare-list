import {
  ChangeEvent, FormEvent, useState,
} from 'react';
import useErrors from '../../hooks/useErrors';

import toast from '../../utils/toast';
import UserService from '../../services/UserService';
import passwordConfirmation from '../../utils/passwordConfirmation';

interface PasswordLevelProps {
  size: boolean;
  number: boolean;
  letter: boolean;
  capitalLetter: boolean;
  special: boolean;
}

export default function useDataSecurity() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordLevel, setPasswordLevel] = useState<PasswordLevelProps>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors, setError, removeError, getErrorMessageFieldName,
  } = useErrors();

  const token = localStorage.getItem('token') || '';

  const isFormValid = (
    (password && newPassword)
    && (repeatPassword && errors.length === 0)
    && passwordLevel?.size
    && passwordLevel?.letter
    && passwordLevel?.capitalLetter
    && passwordLevel.number
    && passwordLevel.special
  );

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);

    if (!event.target.value) {
      setError({ field: 'password', message: 'Senha atual é obrigatório!' });
    } else {
      removeError('password');
    }
  }

  function handleNewPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setNewPassword(event.target.value);
    if (!event.target.value) {
      removeError('newPassword');
      setError({ field: 'newPassword', message: 'Nova senha é obrigatório' });
    } else
      if (password === newPassword) {
        removeError('newPassword');
        setError({ field: 'newPassword', message: 'Essa senha é igual a atual' });
      } else {
        removeError('newPassword');
      }

    setPasswordLevel(passwordConfirmation(event.target.value));
  }

  function handleRepeatPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setRepeatPassword(event.target.value);

    if (!event.target.value) {
      setError({ field: 'repeatPassword', message: 'Senha é obrigatório' });
    } else {
      removeError('repeatPassword');
    }

    if (repeatPassword !== newPassword) {
      setError({ field: 'repeatPassword', message: 'Essa senha não confere com nova senha' });
    } else {
      removeError('repeatPassword');
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      if (password && newPassword) {
        await UserService.UpdateDataSecurity(token, { password, newPassword });
      }

      toast({
        type: 'success',
        text: 'Senha alterada com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao alterar a senha!',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    password,
    newPassword,
    repeatPassword,
    passwordLevel,
    isSubmitting,
    isFormValid,
    getErrorMessageFieldName,
    handlePasswordChange,
    handleNewPasswordChange,
    handleRepeatPasswordChange,
    handleSubmit,
  };
}
