import PropTypes from 'prop-types';
import { useState } from 'react';

import useErrors from '../../hooks/useErrors';
import maskMoney from '../../utils/maskMoney';
import cleanMask from '../../utils/cleanMask';

import * as S from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Button from '../Button';

export default function FormNewList({ onSubmit }) {
  const [store, setStore] = useState('');
  const [estimated, setEstimated] = useState('');
  const {
    errors, setError, removeError, getErrorMessageFieldName,
  } = useErrors();

  const isFormValid = ((store && estimated) && errors.length === 0);

  function handleStoreChange(event) {
    setStore(event.target.value);

    if (!event.target.value) {
      setError({ field: 'store', message: 'Nome da loja ou marca é obrigatório.' });
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
    const estimatedClean = cleanMask(estimated);
    onSubmit({
      store, estimated: estimatedClean,
    });
  }

  return (
    <S.Form onSubmit={(event) => handleSubmit(event)} noValidate>
      <FormGroup
        error={getErrorMessageFieldName('store')}
      >
        <Input
          placeholder="Nome do estabelecimento ou marca"
          onChange={(event) => handleStoreChange(event)}
          value={store}
          maxLength="25"
        />
      </FormGroup>

      <FormGroup
        error={getErrorMessageFieldName('estimated')}
      >
        <Input
          placeholder="Valor máximo ou estimativa"
          onChange={(event) => handleEstimatedChange(event)}
          maxLength="15"
          value={estimated}
        />
      </FormGroup>

      <Button
        type="submit"
        disabled={!isFormValid}
      >
        Pronto!
      </Button>
    </S.Form>
  );
}

FormNewList.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
