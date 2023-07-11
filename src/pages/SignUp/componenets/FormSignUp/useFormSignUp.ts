import {
  useEffect, useState, ChangeEvent, FormEvent,
} from 'react';

import useErrors from '../../../../hooks/useErrors';
import isEmailValid from '../../../../utils/isEmailValid';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

interface useFormSignUpProps {
  onHandleSubmit: (formData: SignUpFormData) => Promise<void>;
}

export default function useFormSignUp({ onHandleSubmit }: useFormSignUpProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors, setError, removeError, getErrorMessageFieldName,
  } = useErrors();

  const isFormValid = (name && email && password && errors.length === 0);

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

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);

    if (!event.target.value) {
      setError({ field: 'password', message: 'Senha é obrigatório' });
    } else {
      removeError('password');
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);

    await onHandleSubmit({
      name, email, password,
    });

    setIsSubmitting(false);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => () => { }, []);

  return {
    handleSubmit,
    getErrorMessageFieldName,
    name,
    handleNameChange,
    isSubmitting,
    email,
    handleEmailChange,
    handlePasswordChange,
    password,
    isFormValid,
  };
}
