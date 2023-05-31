import PropTypes from 'prop-types';
import { ReactNode } from 'react';

import * as S from './styles';

export default function FormGroup({ children, error = null }
  : {children: ReactNode, error: string | null}) {
  return (
    <S.Container>
      <div className="form-item">
        {children}
      </div>
      {error && <small>{error}</small>}
    </S.Container>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
};

FormGroup.defaultProps = {
  error: null,
};
