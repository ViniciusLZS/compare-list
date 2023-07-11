import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  amount: number;
  measureName: string
  value: number;
  image: string;
}

interface BodyListProps {
  view: string;
  onLoadeProducts: () => void;
  onEditForm: (getproductId: string) => void;
  onDeleteProduct: (productId: string) => Promise<void>;
}

export default function useBodyList({
  onLoadeProducts,
  onEditForm,
  onDeleteProduct,
}: BodyListProps) {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [productBeingDeleted, setProductBeingDeleted] = useState<Product | null>(null);

  function handleTryAgain() {
    onLoadeProducts();
  }

  function editForm(id: string) {
    onEditForm(id);
  }

  function handleDeleteproduct(product: Product) {
    setProductBeingDeleted(product);
    setIsDeleteModalVisible(true);
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setProductBeingDeleted(null);
  };

  const handleConfirmDeleteProduct = async () => {
    setIsLoadingDelete(true);

    if (productBeingDeleted) {
      await onDeleteProduct(productBeingDeleted.id);
    }

    handleCloseDeleteModal();

    setIsLoadingDelete(false);
  };

  return {
    isLoadingDelete,
    isDeleteModalVisible,
    handleTryAgain,
    editForm,
    handleDeleteproduct,
    handleConfirmDeleteProduct,
    productBeingDeleted,
    handleCloseDeleteModal,
  };
}
