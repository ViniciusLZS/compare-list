import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

import useErrors from '../../../hooks/useErrors';
import isEmailValid from '../../../utils/isEmailValid';

import Form from '../Form';
import FormGroup from '../FormGroup';
import Input from '../../Input';
import Button from '../../Button';

export default function FormSignUp({ onHandleSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors, setError, removeError, getErrorMessageFieldName,
  } = useErrors();

  const isFormValid = (name && email && password && errors.length === 0);

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail é obrigatório' });
    } else {
      removeError('email');
    }
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);

    if (!event.target.value) {
      setError({ field: 'senha', message: 'Senha é obrigatório' });
    } else {
      removeError('senha');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    await onHandleSubmit({
      name, email, password,
    });

    setIsSubmitting(false);
  }

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
            error={getErrorMessageFieldName('senha')}
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
