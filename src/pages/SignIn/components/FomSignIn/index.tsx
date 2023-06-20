import {
  useContext, useEffect, useState, ChangeEvent, FormEvent,
} from 'react';
import { Link } from 'react-router-dom';

import * as S from './styles';

import useErrors from '../../../../hooks/useErrors';
import isEmailValid from '../../../../utils/isEmailValid';

import FormGroup from '../../../../components/Forms/FormGroup';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Form from '../../../../components/Forms/Form';

import { AuthContext } from '../../../../context/AuthContext';

export default function FormSignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

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

    if (isMounted) {
      setIsSubmitting(false);
    }
  }

  useEffect(() => () => {
    setIsMounted(false);
  }, []);

  return (
    <S.Container>
      <h1>Faça seu login</h1>

      <Form onSubmit={(event) => handleSubmit(event)} noValidate>
        <FormGroup error={getErrorMessageFieldName('email')}>
          <Input
            label="E-mail"
            value={email}
            onChange={(event) => { handleEmailChange(event); }}
            type="email"
            placeholder="Digite aqui seu e-mail"
            disabled={isSubmitting}
            error={getErrorMessageFieldName('email')}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageFieldName('password')}>
          <Input
            label="Senha"
            onChange={(event) => { handlePasswordChange(event); }}
            value={password}
            type="password"
            placeholder="Digite aqui sua Senha"
            disabled={isSubmitting}
            error={getErrorMessageFieldName('password')}
          />
        </FormGroup>

        <S.PasswordRescue>
          <Link to="/">
            <span>Esqueci a senha.</span>
          </Link>
        </S.PasswordRescue>

        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={!isFormValid}
        >
          Entrar
        </Button>
      </Form>

      <S.ContainerSignUp>
        <Link to="/signup">
          <div className="signUp">
            <p>Não possui uma conta?</p>
            <p>Cadastre-se aqui.</p>
          </div>
        </Link>
      </S.ContainerSignUp>
    </S.Container>
  );
}
