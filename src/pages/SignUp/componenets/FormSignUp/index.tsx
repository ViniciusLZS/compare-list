import {
  useEffect, useState, ChangeEvent, FormEvent,
} from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

import useErrors from '../../../../hooks/useErrors';
import isEmailValid from '../../../../utils/isEmailValid';

import Form from '../../../../components/Forms/Form';
import FormGroup from '../../../../components/Forms/FormGroup';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

interface FormSignUpProps {
  onHandleSubmit: (formData: SignUpFormData) => Promise<void>;
}

export default function FormSignUp({ onHandleSubmit }: FormSignUpProps) {
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

  return (
    <S.Container>
      <h1>Faça seu cadastro</h1>

      <Form onSubmit={(event) => handleSubmit(event)} noValidate>
        <FormGroup error={getErrorMessageFieldName('name')}>
          <Input
            label="Nome*"
            value={name}
            onChange={(event) => { handleNameChange(event); }}
            type="text"
            placeholder="Digite aqui seu nome"
            error={getErrorMessageFieldName('name')}
            disabled={isSubmitting}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageFieldName('email')}>
          <Input
            label="E-mail*"
            value={email}
            onChange={(event) => { handleEmailChange(event); }}
            type="email"
            placeholder="Digite aqui seu e-mail"
            error={getErrorMessageFieldName('email')}
            disabled={isSubmitting}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageFieldName('password')}>
          <Input
            label="Senha*"
            onChange={(event) => { handlePasswordChange(event); }}
            value={password}
            type="password"
            placeholder="Digite aqui sua Senha"
            error={getErrorMessageFieldName('password')}
            disabled={isSubmitting}
          />
        </FormGroup>

        <Button
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmitting}
        >
          Cadastrar
        </Button>
      </Form>
    </S.Container>
  );
}

FormSignUp.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};

// FormSignUp.defaultProps = {
//   onHandleSubmit: () => { },
// };
