import * as S from './styles';

import useFormSignUp from './useFormSignUp';

import Form from '../../../../components/Forms/Form';
import FormGroup from '../../../../components/Forms/FormGroup';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

import Check from '../../../../assets/image/icons/signUp/check.svg';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

interface FormSignUpProps {
  onHandleSubmit: (formData: SignUpFormData) => Promise<void>;
}

export default function FormSignUp({ onHandleSubmit }: FormSignUpProps) {
  const {
    name,
    email,
    password,
    levelPassword,
    getErrorMessageFieldName,
    isSubmitting,
    isFormValid,
    handleSubmit,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
  } = useFormSignUp({ onHandleSubmit });

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

        <S.PasswordRequirements>
          <div>
            <span>8 digitos</span>
            {levelPassword?.size
          && <img src={Check} alt="check" />}
          </div>

          <div>
            <span>Numeros</span>
            {levelPassword?.number && <img src={Check} alt="check" />}
          </div>

          <div>
            <span>Letra</span>
            {levelPassword?.letter && <img src={Check} alt="check" />}
          </div>

          <div>
            <span>Letra maiúscula</span>
            {levelPassword?.capitalLetter && <img src={Check} alt="check" />}
          </div>

          <div>
            <span>Caracter especial</span>
            {levelPassword?.special && <img src={Check} alt="check" />}
          </div>
        </S.PasswordRequirements>

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
