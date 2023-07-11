import {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';

import useErrors from '../../../../hooks/useErrors';
import maskMoney from '../../../../utils/maskMoney';
import cleanMask from '../../../../utils/cleanMask';

interface FormNewlistData {
  name: string;
  estimated: string
}

interface FormNewListProps {
  onSubmit: (formData: FormNewlistData) => Promise<void>;
}

export default function useFormNewList({ onSubmit } : FormNewListProps) {
  const [name, setName] = useState('');
  const [estimated, setEstimated] = useState('');
  const [isSubmitting, setIsSubmintting] = useState(false);

  const {
    errors, setError, removeError, getErrorMessageFieldName,
  } = useErrors();

  const isFormValid = (
    (name && estimated) && errors.length === 0 && Number(cleanMask(estimated)) > 0
  );

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

    if (Number(cleanMask(event.target.value)) === 0) {
      setError({ field: 'estimated', message: 'Valor deve ser maior que zero' });
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

  return {
    handleSubmit,
    getErrorMessageFieldName,
    handleNameChange,
    name,
    isSubmitting,
    handleEstimatedChange,
    estimated,
    isFormValid,
  };
}
