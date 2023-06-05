/* eslint-disable react/require-default-props */
import { ReactNode, MouseEvent } from 'react';
import reactDom from 'react-dom';

import * as S from './styles';

// import Button from '../../Button';

import CloseIcon from '../../../assets/image/icons/close.svg';

interface ContainerModalProps {
  danger?: boolean;
  children: ReactNode;
  handleModal: () => void;
  handleDropdown: () => void;
}

export default function ContainerModal(
  {
    danger = false, children, handleModal, handleDropdown,
  }: ContainerModalProps,
) {
  const modalRoot = document.getElementById('modal-root');

  function handleClickOverlay(event: MouseEvent<HTMLDivElement | HTMLButtonElement>) {
    if (event.target === event.currentTarget) {
      handleModal();
    }
  }

  function handleClickModal() {
    handleDropdown();
  }

  if (!modalRoot) {
    return null;
  }
  return reactDom.createPortal(
    <S.Overlay onClick={(event) => handleClickOverlay(event)}>
      <S.Container danger={danger} onClick={() => handleClickModal()}>
        <button type="button" onClick={() => handleModal()}>
          <S.Close>
            <img src={CloseIcon} alt="x" />
          </S.Close>
        </button>
        {children}
      </S.Container>
    </S.Overlay>,
    modalRoot,
  );
}
