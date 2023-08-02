import * as S from './styles';

import useUserData from './useUserData';

import Button from '../../components/Button';
import Form from '../../components/Forms/Form';
import FormGroup from '../../components/Forms/FormGroup';
import Input from '../../components/Input';

export default function UserData() {
  const {
    handleSubmit,
    getErrorMessageFieldName,
    name,
    handleNameChange,
    isSubmitting,
    email,
    handleEmailChange,
    isFormValid,
  } = useUserData();

  return (
    <S.Container>
      <h1>Dados Pessoais</h1>

      <Form onSubmit={(event) => handleSubmit(event)} noValidate>
        <FormGroup error={getErrorMessageFieldName('name')}>
          <Input
            label="Nome"
            value={name || ''}
            onChange={(event) => { handleNameChange(event); }}
            type="text"
            placeholder="Digite aqui seu nome"
            error={getErrorMessageFieldName('name')}
            disabled={isSubmitting}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageFieldName('email')}>
          <Input
            label="E-mail"
            value={email || ''}
            onChange={(event) => { handleEmailChange(event); }}
            type="email"
            placeholder="Digite aqui seu e-mail"
            error={getErrorMessageFieldName('email')}
            disabled={isSubmitting}
          />
        </FormGroup>

        <Button
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmitting}
        >
          Salvar
        </Button>
      </Form>
    </S.Container>
  );
}
