import * as S from './styles';

import useDataSecurity from './useDataSecurity';

import Button from '../../components/Button';
import Form from '../../components/Forms/Form';
import FormGroup from '../../components/Forms/FormGroup';
import Input from '../../components/Input';

export default function DataSecurity() {
  const {
    handleSubmit,
    getErrorMessageFieldName,
    isSubmitting,
    password,
    newPassword,
    repeatPassword,
    handlePasswordChange,
    handleNewPasswordChange,
    handleRepeatPasswordChange,
    isFormValid,
  } = useDataSecurity();

  return (
    <S.Container>
      <h1>Dados de segurança</h1>

      <Form onSubmit={(event) => handleSubmit(event)} noValidate>
        <FormGroup error={getErrorMessageFieldName('password')}>
          <Input
            label="Senha atual*"
            onChange={(event) => { handlePasswordChange(event); }}
            value={password}
            type="password"
            placeholder="Digite aqui sua Senha"
            error={getErrorMessageFieldName('password')}
            disabled={isSubmitting}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageFieldName('newPassword')}>
          <Input
            label="Nova senha*"
            onBlur={(event) => { handleNewPasswordChange(event); }}
            onChange={(event) => { handleNewPasswordChange(event); }}
            value={newPassword}
            type="password"
            placeholder="Digite a nova senha aqui"
            error={getErrorMessageFieldName('newPassword')}
            disabled={isSubmitting}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageFieldName('repeatPassword')}>
          <Input
            label="Repita a nova senha*"
            onBlur={(event) => { handleRepeatPasswordChange(event); }}
            onChange={(event) => { handleRepeatPasswordChange(event); }}
            value={repeatPassword}
            type="password"
            placeholder="Repita a nova senha aqui"
            error={getErrorMessageFieldName('repeatPassword')}
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
