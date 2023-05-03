import PropTypes from 'prop-types';

import * as S from './styles';

export default function FormGroup({ children, error }) {
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
