import { Link } from 'react-router-dom';

import * as S from './styles';

import FormGroup from '../../../../components/Forms/FormGroup';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Form from '../../../../components/Forms/Form';
import useFormSignIn from './useFormSignIn';

export default function FormSignIn() {
  const {
    handleSubmit,
    getErrorMessageFieldName,
    email,
    handleEmailChange,
    handlePasswordChange,
    password,
    isSubmitting,
    isFormValid,
  } = useFormSignIn();

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
