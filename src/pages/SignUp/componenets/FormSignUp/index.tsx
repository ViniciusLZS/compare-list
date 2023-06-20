import * as S from './styles';

import Form from '../../../../components/Forms/Form';
import FormGroup from '../../../../components/Forms/FormGroup';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import useFormSignUp from './useFormSignUp';

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
