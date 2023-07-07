/* eslint-disable react/require-default-props */
import { ReactNode } from 'react';

import * as S from './styles';

import CloseIcon from '../../../assets/image/icons/close.svg';
import ReactPortal from '../../ReactPortal';
import Button from '../../Button';
import useModal from './useModal';
import useAnimatedUnmount from '../../../hooks/useAnimatedUnmount';

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
  visible: boolean;
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
  const {
    handleCloseModalClickOverlay,
    handleClickModal,
    handleCloseModal,
  } = useModal({
    handleModal,
    handleDropdown,
    onCancel,
  });

  const { animatedElementRef, shouldRender } = useAnimatedUnmount(visible);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <S.Overlay
        isLeaving={!visible}
        ref={animatedElementRef}
        onClick={(event) => handleCloseModalClickOverlay(event)}
      >
        <S.Container
          isLeaving={!visible}
          danger={danger}

        >
          <h1>{title}</h1>

          <S.Close type="button" onClick={handleCloseModal}>
            <img src={CloseIcon} alt="x" />
          </S.Close>

          <S.Content
            onClick={() => handleClickModal()}
          >

            <div className="modal-body">{children}</div>

            {visible && onConfirm && (
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
          </S.Content>
        </S.Container>
      </S.Overlay>
    </ReactPortal>
  );
}
