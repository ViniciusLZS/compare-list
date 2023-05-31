/* eslint-disable react/require-default-props */
import { ReactNode } from 'react';
import reactDom from 'react-dom';

import * as S from './styles';

import Button from '../../Button';

import CloseIcon from '../../../assets/image/icons/close.svg';

interface ContainerModalProps {
  danger?: boolean;
  children: ReactNode;
}

export default function ContainerModal({ danger = false, children }: ContainerModalProps) {
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    return null;
  }
  return reactDom.createPortal(
    <S.Overlay>
      <S.Container danger={danger}>
        <S.Close>
          <img src={CloseIcon} alt="x" />
        </S.Close>
        {children}

        <S.Footer>
          <button type="button" className="cancel-button">
            Cancelar
          </button>

          <Button type="button" danger={danger}>
            Deletar
          </Button>
        </S.Footer>
      </S.Container>
    </S.Overlay>,
    modalRoot,
  );
}
