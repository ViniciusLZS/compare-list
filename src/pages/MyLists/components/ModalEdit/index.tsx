import {
  ChangeEvent, FormEvent, forwardRef, useImperativeHandle, useState,
} from 'react';
import Form from '../../../../components/Forms/Form';
import FormGroup from '../../../../components/Forms/FormGroup';
import Input from '../../../../components/Input';
import ContainerModal from '../../../../components/Modal/ContainerModal';
import maskMoney from '../../../../utils/maskMoney';
import Button from '../../../../components/Button';
import cleanMask from '../../../../utils/cleanMask';

interface listProps {
  id: string;
  name: string;
  estimated: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: string;
}

interface FormModalData {
  name: string;
  estimated: string;
}

interface ModalEditProps {
  isLoading: boolean;
  isModalVisible: boolean;
  onCloseModal: () => void;
  onSubmit: (formData: FormModalData) => Promise<void>;
}

const ModalEdit = forwardRef(({
  isLoading,
  isModalVisible,
  onCloseModal,
  onSubmit,
}: ModalEditProps, ref) => {
  const [name, setName] = useState('');
  const [estimated, setEstimated] = useState('');

  useImperativeHandle(ref, () => ({
    setFieldValues: (listEdit: listProps) => {
      setName(listEdit.name ?? '');
      setEstimated(maskMoney(listEdit.estimated.toString()) ?? '');
    },
  }));

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }
  function handleEstimatedChange(event: ChangeEvent<HTMLInputElement>) {
    setEstimated(maskMoney(event.target.value));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const estimatedClear = cleanMask(estimated);
    await onSubmit({ name, estimated: estimatedClear });
  }

  return (
    <ContainerModal
      isLoading={isLoading}
      visible={isModalVisible}
      title="Editar"
      confirmLabel="Editar"
      onCancel={onCloseModal}
    >
      <Form onSubmit={(event) => handleSubmit(event)} noValidate>
        <FormGroup>
          <Input
            label="Nome"
            value={name}
            maxLength={15}
            onChange={(event) => { handleNameChange(event); }}
            type="text"
            placeholder="Nome da lista"
            disabled={isLoading}
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="Valor estimado"
            value={estimated}
            maxLength={15}
            onChange={(event) => { handleEstimatedChange(event); }}
            type="text"
            placeholder="Valor estimado ou máximo"
            disabled={isLoading}
          />
        </FormGroup>

        <Button
          type="submit"
          // disabled={!isFormValid}
          isLoading={isLoading}
        >
          Editar
        </Button>
      </Form>
    </ContainerModal>
  );
});

export default ModalEdit;
