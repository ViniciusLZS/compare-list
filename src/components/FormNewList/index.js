import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import useErrors from '../../hooks/useErrors';
import maskMoney from '../../utils/maskMoney';

import * as S from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Button from '../Button';

export default function FormNewList() {
  const [store, setStore] = useState('');
  const [estimated, setEstimed] = useState('');
  const {
    errors, setError, removeError, getErrorMessageFieldName,
  } = useErrors();

  const history = useHistory();

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
    setEstimed(maskMoney(event.target.value));

    if (!event.target.value) {
      setError({ field: 'estimated', message: 'Valor Obrigatório' });
    } else {
      removeError('estimated');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log({ Store: store, Value: estimated });

    history.push('/list');
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
