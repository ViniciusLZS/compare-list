import PropTypes from 'prop-types';
import * as S from './styles';

export default function Button({ children, disabled }) {
  return (
    <S.StyledButton disabled={disabled}>
      {children}
    </S.StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
};
