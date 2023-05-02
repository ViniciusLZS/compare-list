import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Button from '../Button';

import * as S from './styles';
import maskMoney from '../../utils/maskMoney';

export default function FormNewList() {
  const [nameStore, setNomeStore] = useState('');
  const [estimated, setStimed] = useState('');

  const history = useHistory();

  function handleStoreChange(event) {
    setNomeStore(event.target.value);
  }

  function handleEstimatedChange(event) {
    setStimed(maskMoney(event.target.value));
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log({ Store: nameStore, Value: estimated });

    history.push('/list');
  }
  return (
    <S.Form onSubmit={(event) => handleSubmit(event)} noValidate>
      <FormGroup
        error="O campo é obrigatorio"
      >
        <Input
          placeholder="Nome do estabelecimento ou marca"
          onChange={(event) => handleStoreChange(event)}
          value={nameStore}
          maxLength="25"
        />
      </FormGroup>

      <FormGroup
        error="O campo é obrigatorio"
      >
        <Input
          placeholder="Valor máximo ou estimativa"
          onChange={(event) => handleEstimatedChange(event)}
          maxLength="15"
          value={estimated}
        />
      </FormGroup>

      <Button type="submit">
        Pronto!
      </Button>
    </S.Form>
  );
}
