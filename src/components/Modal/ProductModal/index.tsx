import {
  ChangeEvent, FormEvent, forwardRef, useEffect, useImperativeHandle, useState,
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
import MercadoLivreService from '../../../services/MercadoLivreService';

interface FormModalData {
  name: string;
  value?: string;
  amount?: string
  measuresId?: string;
  image?: string;
}

interface Product {
  name: string;
  value: string;
  amount: string;
  image: string;
  // eslint-disable-next-line camelcase
  measure_id: string;
}

interface ProductModalProps {
  modal: boolean;
  handleModal: () => void;
  onSubmit: (formData: FormModalData) => Promise<void>;
  mode: string;
}

const ProductModal = forwardRef(({
  modal, handleModal, onSubmit, mode,
}:
  ProductModalProps, ref) => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [amount, setAmount] = useState('');
  const [measuresId, setMeasuresId] = useState('');
  const [categoriesId, setCategoriesId] = useState(' ');
  const [image, setImage] = useState('');

  const [measures, setMeasures] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState<any[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setIsMounted] = useState(true);
  const [dropdown, setDropdown] = useState(true);

  const {
    errors, setError, removeError, getErrorMessageFieldName,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  const token = localStorage.getItem('token') ?? '';

  useImperativeHandle(ref, () => ({
    setFieldValues: (product: Product) => {
      setName(product.name ?? '');
      setValue(maskMoney(product.value.toString()) ?? '');
      setAmount(product.amount ?? '');
      setImage(product.image ?? '');
      setMeasuresId(product.measure_id ?? '');
    },
    resetFields: () => {
      setName('');
      setValue('');
      setAmount('');
      setImage('');
      setMeasuresId('');
    },
  }));

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await MercadoLivreService.listAllCategories(token);
        if (mounted) {
          setCategories(categoriesList);
        }
      } catch (error) {
        console.log('🚀 ~ file: index.tsx:39 ~ loadMeasures ~ error:', error);
      }
    }
    loadCategories();

    async function loadMeasures() {
      try {
        const measuresList = await MeasureService.listMeasures(token);
        if (mounted) {
          setMeasures(measuresList);
        }
      } catch (error) {
        console.log('🚀 ~ file: index.tsx:39 ~ loadMeasures ~ error:', error);
      }
    }
    loadMeasures();

    return () => {
      setIsMounted(false);
    };
  }, [token, mounted]);

  useEffect(() => {
    async function handleSubmitProduct() {
      try {
        if (name) {
          setIsLoading(true);
          const listProducts = await MercadoLivreService.listAllProducts(
            { name, categoriesId, token },
          );
          setProducts(listProducts.results);
          setIsLoading(false);
        }
      } catch (error) {
        console.log('🚀 ~ file: index.tsx:70 ~ handleSubmitProduct ~ error:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (name) {
      const timeout = setTimeout(() => {
        handleSubmitProduct();
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }

    return undefined;
  }, [name, token, categoriesId]);

  function handleProductChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
    setDropdown(true);

    if (!event.target.value) {
      setError({ field: 'product', message: 'Produto é obrigatório' });
    } else {
      removeError('product');
    }
  }

  function handleValorChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(maskMoney(event.target.value));
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
    await onSubmit({
      name, value: estimatedClean, amount, measuresId, image,
    });

    setIsSubmitting(false);
  }

  function handleProductSelect(product: {title: string; thumbnail: string}) {
    setName(product.title);
    setImage(product.thumbnail);
    setDropdown(false);
  }

  function handleDropdown() {
    setDropdown(false);
  }

  if (modal) {
    return (
      <ContainerModal handleModal={handleModal} handleDropdown={() => handleDropdown()}>
        <h1>{mode}</h1>
        {image && (
        <div className="img">
          <img src={`${image}`} alt="img" />
        </div>
        )}
        <Form>
          <FormGroup>
            <Select
              label="Filtrar por categoria"
              placeholder="Selecione a categoria"
              disabled={isSubmitting}
              optionsSelect={categories}
              setOptionId={setCategoriesId}
              optionId={categoriesId}
            />
          </FormGroup>
        </Form>

        <Form onSubmit={(event) => handleSubmit(event)} noValidate>
          <FormGroup error={getErrorMessageFieldName('product')}>
            <Input
              label="Produto*"
              value={name}
              onChange={(event) => { handleProductChange(event); }}
              type="text"
              placeholder="Digite aqui o nome do produto"
              error={getErrorMessageFieldName('product')}
              disabled={isSubmitting}
              isLoading={isLoading}
            />

            {products.length > 0 && name && (
            <div className="dropdown">
              {dropdown && !isLoading && products.map((product) => (
                <button type="button" onClick={() => handleProductSelect(product)} key={product.id}>{product.title}</button>
              ))}
            </div>
            )}
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
            {mode}
          </Button>
        </Form>
      </ContainerModal>
    );
  }
  return null;
});

export default ProductModal;
