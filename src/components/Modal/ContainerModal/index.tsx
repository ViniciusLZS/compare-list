/* eslint-disable react/require-default-props */
import { ReactNode, MouseEvent } from 'react';

import * as S from './styles';

import CloseIcon from '../../../assets/image/icons/close.svg';
import ReactPortal from '../../ReactPortal';
import Button from '../../Button';

interface ContainerModalProps {
  danger?: boolean;
  children: ReactNode;
  handleModal?: (() => void) | undefined;
  handleDropdown?: () => void;
  title: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  visible?: boolean;
  isLoading?: boolean;
}

export default function ContainerModal(
  {
    danger = false,
    children,
    handleModal,
    handleDropdown,
    title,
    cancelLabel = 'Cancelar',
    confirmLabel = 'Confirmar',
    onCancel,
    onConfirm,
    visible = false,
    isLoading = false,
  }: ContainerModalProps,
) {
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

  if (!visible && onConfirm) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <S.Overlay onClick={(event) => handleCloseModalClickOverlay(event)}>
        <S.Container danger={danger} onClick={() => handleClickModal()}>
          <h1>{title}</h1>

          <button type="button" onClick={handleCloseModal}>
            <S.Close>
              <img src={CloseIcon} alt="x" />
            </S.Close>
          </button>

          <div className="modal-body">{children}</div>

          {visible && (
          <S.Footer>
            <button
              type="button"
              className="cancel-button"
              disabled={isLoading}
              onClick={onCancel}
            >
              {cancelLabel}
            </button>

            <Button
              type="button"
              danger={danger}
              isLoading={isLoading}
              handleClick={onConfirm}
            >
              {confirmLabel}
            </Button>
          </S.Footer>
          )}
        </S.Container>
      </S.Overlay>
    </ReactPortal>
  );
}
