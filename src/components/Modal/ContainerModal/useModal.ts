import { MouseEvent } from 'react';

interface useModalProps {
  handleModal?: (() => void) | undefined;
  handleDropdown?: () => void;
  onCancel?: () => void;
}

export default function useModal({
  handleModal,
  handleDropdown,
  onCancel,
}: useModalProps) {
  function handleCloseModalClickOverlay(event: MouseEvent<HTMLDivElement | HTMLButtonElement>) {
    if (event.target === event.currentTarget) {
      if (handleModal) {
        handleModal();
      }

      if (onCancel) {
        onCancel();
      }
    }
  }

  function handleCloseModal() {
    if (handleModal) {
      handleModal();
    }

    if (onCancel) {
      onCancel();
    }
  }

  function handleClickModal() {
    if (handleDropdown) {
      handleDropdown();
    }
  }

  return {
    handleCloseModalClickOverlay,
    handleClickModal,
    handleCloseModal,
  };
}
