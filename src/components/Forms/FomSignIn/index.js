import { Link } from 'react-router-dom';

import { useState } from 'react';
import * as S from './styles';

import FormGroup from '../FormGroup';
import Input from '../../Input';
import Button from '../../Button';
import Form from '../Form';

export default function FormSignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <S.Container>
      <h1>Faça seu login</h1>

      <Form noValidate>
        <FormGroup>
          <Input
            label="E-mail"
            value={email}
            onChange={(event) => { handleEmailChange(event); }}
            type="email"
            placeholder="Digite aqui seu e-mail"
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="Senha"
            onChange={(event) => { handlePasswordChange(event); }}
            value={password}
            type="password"
            placeholder="Digite aqui sua Senha"
          />
        </FormGroup>

        <S.PasswordRescue>
          <Link to="/">
            <span>Esqueci a senha.</span>
          </Link>
        </S.PasswordRescue>

        <Button type="submit">Entrar</Button>
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
