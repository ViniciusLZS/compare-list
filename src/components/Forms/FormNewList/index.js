import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import useErrors from '../../../hooks/useErrors';
import maskMoney from '../../../utils/maskMoney';
import cleanMask from '../../../utils/cleanMask';

import * as S from './styles';

import FormGroup from '../FormGroup';
import Input from '../../Input';
import Button from '../../Button';

export default function FormNewList({ onSubmit }) {
  const [name, setName] = useState('');
  const [estimated, setEstimated] = useState('');
  const [isSubmitting, setIsSubmintting] = useState(false);

  const {
    errors, setError, removeError, getErrorMessageFieldName,
  } = useErrors();

  const isFormValid = ((name && estimated) && errors.length === 0);

  function handleNameChange(event) {
    if (event.target.value.length <= 30) {
      setName(event.target.value);
    }

    if (!event.target.value) {
      setError({ field: 'Name', message: 'Nome da loja ou marca é obrigatório.' });
    } else {
      removeError('store');
    }
  }

  function handleEstimatedChange(event) {
    setEstimated(maskMoney(event.target.value));

    if (!event.target.value) {
      setError({ field: 'estimated', message: 'Valor Obrigatório' });
    } else {
      removeError('estimated');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmintting(true);

    const estimatedClean = cleanMask(estimated);
    await onSubmit({
      name, estimated: estimatedClean,
    });

    setIsSubmintting(false);
  }

  useEffect(() => () => { }, []);

  return (
    <S.Form onSubmit={(event) => handleSubmit(event)} noValidate>
      <FormGroup
        error={getErrorMessageFieldName('store')}
      >
        <Input
          label="Nome"
          type="text"
          placeholder="Nome do estabelecimento ou marca"
          onChange={(event) => handleNameChange(event)}
          value={name}
          maxLength="30"
          disabled={isSubmitting}
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
          maxLength="15"
          value={estimated}
          disabled={isSubmitting}
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

FormNewList.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
