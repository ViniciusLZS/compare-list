import {
  ChangeEvent, FormEvent, useEffect, useImperativeHandle, useState,
} from 'react';

import useErrors from '../../../../hooks/useErrors';

import MeasureService from '../../../../services/MeasureService';

import maskMoney from '../../../../utils/maskMoney';
import CleanMask from '../../../../utils/cleanMask';

import MercadoLivreService from '../../../../services/MercadoLivreService';

interface ProductProps {
  name: string;
  value: string;
  amount: string;
  image: string;
  measureId: string;
}

interface FormModalData {
  name: string;
  value?: string;
  amount?: string
  measureId?: string;
  image?: string;
}

interface useProductModalProps {
  onSubmit: (formData: FormModalData) => Promise<void>;
  ref: React.ForwardedRef<any>
}

export default function useProductModal({ onSubmit, ref }: useProductModalProps) {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [amount, setAmount] = useState('');
  const [measureId, setMeasureId] = useState('');
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
    setFieldValues: (product: ProductProps) => {
      setName(product.name ?? '');
      setValue(maskMoney(product.value) ?? '');
      setAmount(product.amount ?? '');
      setImage(product.image ?? '');
      setMeasureId(product.measureId ?? '');
    },
    resetFields: () => {
      setName('');
      setValue('');
      setAmount('');
      setImage('');
      setMeasureId('');
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

    const valueClean = CleanMask(value);
    await onSubmit({
      name, value: valueClean, amount, measureId, image,
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

  return {
    handleDropdown,
    image,
    isSubmitting,
    categories,
    setCategoriesId,
    categoriesId,
    handleSubmit,
    getErrorMessageFieldName,
    name,
    handleProductChange,
    isLoading,
    products,
    dropdown,
    handleProductSelect,
    value,
    handleValorChange,
    amount,
    handleAmountChange,
    measures,
    measureId,
    setMeasureId,
    isFormValid,
  };
}
