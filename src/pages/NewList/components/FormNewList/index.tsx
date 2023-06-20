import {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';

import useErrors from '../../../../hooks/useErrors';
import maskMoney from '../../../../utils/maskMoney';
import cleanMask from '../../../../utils/cleanMask';

import * as S from './styles';

import FormGroup from '../../../../components/Forms/FormGroup';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

interface FormNewlistData {
  name: string;
  estimated: string
}

interface FormNewListProps {
  onSubmit: (formData: FormNewlistData) => Promise<void>;
}

export default function FormNewList({ onSubmit }: FormNewListProps) {
  const [name, setName] = useState('');
  const [estimated, setEstimated] = useState('');
  const [isSubmitting, setIsSubmintting] = useState(false);

  const {
    errors, setError, removeError, getErrorMessageFieldName,
  } = useErrors();

  const isFormValid = ((name && estimated) && errors.length === 0);

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length <= 30) {
      setName(event.target.value);
    }

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome da loja ou marca é obrigatório.' });
    } else {
      removeError('name');
    }
  }

  function handleEstimatedChange(event: ChangeEvent<HTMLInputElement>) {
    setEstimated(maskMoney(event.target.value));

    if (!event.target.value) {
      setError({ field: 'estimated', message: 'Valor Obrigatório' });
    } else {
      removeError('estimated');
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmintting(true);

    const estimatedClean = cleanMask(estimated);
    await onSubmit({
      name, estimated: estimatedClean,
    });

    setIsSubmintting(false);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => () => { }, []);

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
          maxLength={30}
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
