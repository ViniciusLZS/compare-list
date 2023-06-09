import { useEffect, useState } from 'react';

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
  view,
  onLoadeProducts,
  onEditForm,
  onDeleteProduct,
}: BodyListProps) {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [productBeingDeleted, setProductBeingDeleted] = useState<Product | null>(null);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight - window.innerHeight);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, []]);

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
