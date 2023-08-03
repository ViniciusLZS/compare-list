import * as S from './styles';

import FormGroup from '../../../../components/Forms/FormGroup';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import useFormNewList from './useFormNewList';

interface FormNewlistData {
  name: string;
  estimated: string
}

interface FormNewListProps {
  onSubmit: (formData: FormNewlistData) => Promise<void>;
}

export default function FormNewList({ onSubmit }: FormNewListProps) {
  const {
    handleSubmit,
    getErrorMessageFieldName,
    handleNameChange,
    name,
    isSubmitting,
    handleEstimatedChange,
    estimated,
    isFormValid,
  } = useFormNewList({ onSubmit });

  return (
    <S.Form onSubmit={(event) => handleSubmit(event)} noValidate>
      <FormGroup
        error={getErrorMessageFieldName('name')}
      >
        <Input
          label="Nome"
          type="text"
          placeholder="Nome do estabelecimento ou marca"
          onChange={(event) => handleNameChange(event)}
          value={name}
          maxLength={26}
          disabled={isSubmitting}
          error={getErrorMessageFieldName('name')}
        />
      </FormGroup>

      <FormGroup
        error={getErrorMessageFieldName('estimated')}
      >
        <Input
          label="Valor"
          type="text"
          placeholder="Valor máximo ou estimativa"
          onChange={(event) => handleEstimatedChange(event)}
          maxLength={15}
          value={estimated}
          disabled={isSubmitting}
          error={getErrorMessageFieldName('estimated')}
        />
      </FormGroup>

      <Button
        type="submit"
        disabled={!isFormValid}
        isLoading={isSubmitting}
      >
        Pronto!
      </Button>
    </S.Form>
  );
}
