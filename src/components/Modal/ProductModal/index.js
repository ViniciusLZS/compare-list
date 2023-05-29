import { useEffect, useState } from 'react';
import * as S from './styles';

import ContainerModal from '../ContainerModal';
import Form from '../../Forms/Form';
import FormGroup from '../../Forms/FormGroup';
import Input from '../../Input';
import Button from '../../Button';
import useErrors from '../../../hooks/useErrors';
import Select from '../../Select';

export default function ProductModal() {
  const [product, setProduct] = useState('');
  const [value, setValor] = useState('');
  const [amount, setAmount] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors, setError, removeError, getErrorMessageFieldName,
  } = useErrors();

  const isFormValid = (product && errors.length === 0);

  function handleProductChange(event) {
    setProduct(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleValorChange(event) {
    setValor(event.target.value);

    if (!event.target.value) {
      setError({ field: 'value', message: 'Valor é obrigatório' });
    } else {
      removeError('value');
    }
  }

  function handleAmountChange(event) {
    setAmount(event.target.value);

    if (!event.target.value) {
      setError({ field: 'amount', message: 'Quant. é obrigatório' });
    } else {
      removeError('amount');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    setIsSubmitting(false);
  }

  useEffect(() => () => { }, []);

  return (
    <ContainerModal>
      <h1>Adicionar</h1>

      <Form onSubmit={(event) => handleSubmit(event)} noValidate>
        <FormGroup error={getErrorMessageFieldName('product')}>
          <Input
            label="Produto*"
            value={product}
            onChange={(event) => { handleProductChange(event); }}
            type="text"
            placeholder="Digite aqui o nome do produto"
            error={getErrorMessageFieldName('product')}
            disabled={isSubmitting}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageFieldName('value')}>
          <Input
            label="Valor*"
            value={value}
            onChange={(event) => { handleValorChange(event); }}
            type="text"
            placeholder="Digite aqui o valor do produto"
            error={getErrorMessageFieldName('value')}
            disabled={isSubmitting}
          />
        </FormGroup>

        <S.Amount>
          <FormGroup error={getErrorMessageFieldName('amount')}>
            <Input
              label="Quant.*"
              value={amount}
              onChange={(event) => { handleAmountChange(event); }}
              type="number"
              placeholder="Digite aqui a quant. do produto"
              error={getErrorMessageFieldName('amount')}
              disabled={isSubmitting}
            />
          </FormGroup>

          <FormGroup>
            <Select>
              <option value="">Sem categoria</option>
              <option value=""> categoria</option>
              <option value="">Sem </option>
            </Select>
          </FormGroup>
        </S.Amount>

        <Button
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmitting}
        >
          Adicionar
        </Button>
      </Form>
    </ContainerModal>
  );
}
