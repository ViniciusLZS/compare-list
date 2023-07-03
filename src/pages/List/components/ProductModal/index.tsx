import { forwardRef } from 'react';

import * as S from './styles';

import Form from '../../../../components/Forms/Form';
import FormGroup from '../../../../components/Forms/FormGroup';
import ContainerModal from '../../../../components/Modal/ContainerModal';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Select from '../../../../components/Select';
import useProductModal from './useProductModal';

interface FormModalData {
  name: string;
  value?: string;
  amount?: string
  measureId?: string;
  image?: string;
}

interface ProductModalProps {
  isVisible: boolean;
  handleModal: () => void;
  onSubmit: (formData: FormModalData) => Promise<void>;
  mode: string;
}

const ProductModal = forwardRef(({
  isVisible, handleModal, onSubmit, mode,
}:
  ProductModalProps, ref) => {
  const {
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
  } = useProductModal({ onSubmit, ref });

  return (

    <ContainerModal
      title={mode}
      handleModal={handleModal}
      handleDropdown={() => handleDropdown()}
      visible={isVisible}
    >
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
              optionId={measureId}
              setOptionId={setMeasureId}
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
});

export default ProductModal;
