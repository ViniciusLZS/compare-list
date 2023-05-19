import { useState } from 'react';

import * as S from './styles';

import Form from '../Form';
import FormGroup from '../FormGroup';
import Input from '../../Input';
import Button from '../../Button';

export default function FormSignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <S.Container>
      <h1>Faça seu cadastro</h1>

      <Form noValidate>
        <FormGroup>
          <Input
            label="Nome"
            value={name}
            onChange={(event) => { handleNameChange(event); }}
            type="text"
            placeholder="Digite aqui seu nome"
          />
        </FormGroup>

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

        <Button type="submit">Cadastrar</Button>
      </Form>
    </S.Container>
  );
}
