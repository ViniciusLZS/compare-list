import PropTypes from 'prop-types';
import reactDom from 'react-dom';
import * as S from './styles';

import Button from '../Button';

export default function Modal({ danger, children }) {
  return reactDom.createPortal(
    <S.Overlay>
      <S.Container danger={danger}>
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
Modal.propTypes = {
  danger: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  danger: false,
};
