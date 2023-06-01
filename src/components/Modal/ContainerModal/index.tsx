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
}

export default function ContainerModal(
  { danger = false, children, handleModal }: ContainerModalProps,
) {
  const modalRoot = document.getElementById('modal-root');

  function handleClick(event: MouseEvent<HTMLDivElement | HTMLButtonElement>) {
    if (event.target === event.currentTarget) {
      handleModal();
    }
  }

  if (!modalRoot) {
    return null;
  }
  return reactDom.createPortal(
    <S.Overlay onClick={(event) => handleClick(event)}>
      <S.Container danger={danger}>
        <button type="button" onClick={handleModal}>
          <S.Close>
            <img src={CloseIcon} alt="x" />
          </S.Close>
        </button>
        {children}

        {/* <S.Footer>
          <button type="button" className="cancel-button">
            Cancelar
          </button>

          <Button type="button" danger={danger}>
            Deletar
          </Button>
        </S.Footer> */}
      </S.Container>
    </S.Overlay>,
    modalRoot,
  );
}
