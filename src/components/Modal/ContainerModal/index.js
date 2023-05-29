import PropTypes from 'prop-types';
import reactDom from 'react-dom';
import * as S from './styles';
import Button from '../../Button';

import CloseIcon from '../../../assets/image/icons/close.svg';

export default function ContainerModal({ danger, children }) {
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
    document.getElementById('modal-root'),
  );
}
ContainerModal.propTypes = {
  danger: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

ContainerModal.defaultProps = {
  danger: false,
};
