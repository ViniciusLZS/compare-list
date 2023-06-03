import {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';

import * as S from './styles';

import useErrors from '../../../hooks/useErrors';

import MeasureService from '../../../services/MeasureService';

import maskMoney from '../../../utils/maskMoney';
import CleanMask from '../../../utils/cleanMask';

import Form from '../../Forms/Form';
import FormGroup from '../../Forms/FormGroup';
import ContainerModal from '../ContainerModal';
import Input from '../../Input';
import Button from '../../Button';
import Select from '../../Select';
import CategoriesService from '../../../services/CategoriesService';

interface FormModalData {
  name: string;
  value?: string;
  amount?: string
  measuresId?: string;
}

interface ProductModal {
  modal: boolean;
  handleModal: () => void;
  onHandleSubmit: (formData: FormModalData) => Promise<void>;
}

export default function ProductModal({ modal, handleModal, onHandleSubmit }: ProductModal) {
  const [name, setName] = useState('');
  const [value, setValor] = useState('');
  const [amount, setAmount] = useState('');
  const [measuresId, setMeasuresId] = useState('');
  const [measures, setMeasures] = useState([]);
  const [categoriesId, setCategoriesId] = useState('');
  const [categories, setCategories] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setIsMounted] = useState(true);

  const {
    errors, setError, removeError, getErrorMessageFieldName,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  useEffect(() => {
    const token = localStorage.getItem('token') ?? '';
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listAll(token);

        setCategories(categoriesList);
      } catch (error) {
        console.log('🚀 ~ file: index.tsx:39 ~ loadMeasures ~ error:', error);
      }
    }
    loadCategories();

    async function loadMeasures() {
      try {
        const measuresList = await MeasureService.listMeasures(token);

        setMeasures(measuresList);
      } catch (error) {
        console.log('🚀 ~ file: index.tsx:39 ~ loadMeasures ~ error:', error);
      }
    }
    loadMeasures();

    return () => {
      setIsMounted(false);
    };
  }, []);

  function handleProductChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'product', message: 'Produto é obrigatório' });
    } else {
      removeError('product');
    }
  }

  function handleValorChange(event: ChangeEvent<HTMLInputElement>) {
    setValor(maskMoney(event.target.value));
  }

  function handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
    if (!Number.isNaN(Number(event.target.value)) && Number(event.target.value) >= 0) {
      setAmount(event.target.value);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);

    const estimatedClean = CleanMask(value);
    await onHandleSubmit({
      name, value: estimatedClean, amount, measuresId,
    });

    setIsSubmitting(false);
  }

  async function handleSubmitCategories() {
    console.log('🚀 ~ file: index.tsx:120 ~ handleSubmitCategories ~ categoriesId:', categoriesId);
  }

  if (modal) {
    return (
      <ContainerModal handleModal={handleModal}>
        <h1>Adicionar</h1>

        <Form>
          <FormGroup>
            <Select
              label="Categorias*"
              placeholder="Sem categorias"
              disabled={isSubmitting}
              optionsSelect={categories}
              setOptionId={setCategoriesId}
              optionId={categoriesId}
              handleSubmitOptions={() => handleSubmitCategories()}
            />
          </FormGroup>
        </Form>

        <Form onSubmit={(event) => handleSubmit(event)} noValidate>
          <FormGroup error={getErrorMessageFieldName('product')}>
            <Input
              label="Produto*"
              value={name}
              maxLength={26}
              onChange={(event) => { handleProductChange(event); }}
              type="text"
              placeholder="Digite aqui o nome do produto"
              error={getErrorMessageFieldName('product')}
              disabled={isSubmitting}
            />
          </FormGroup>

          <FormGroup error={getErrorMessageFieldName('value')}>
            <Input
              label="Valor"
              value={value}
              maxLength={15}
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
                label="Quantidade"
                value={amount}
                onChange={(event) => { handleAmountChange(event); }}
                type="number"
                placeholder="Digite aqui a quant. do produto"
                error={getErrorMessageFieldName('amount')}
                disabled={isSubmitting}
              />
            </FormGroup>

            <FormGroup>
              <Select
                label="Medidas"
                placeholder="Sem medida"
                disabled={isSubmitting}
                optionsSelect={measures}
                optionId={measuresId}
                setOptionId={setMeasuresId}
              />
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
  return null;
}
