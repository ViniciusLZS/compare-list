import PropTypes from 'prop-types';

import * as S from './styles';

import Spinner from '../Spinner';

export default function Button({
  children, disabled, isLoading, handleClick, variant, danger,
}) {
  return (
    <S.StyledButton
      onClick={handleClick}
      disabled={disabled || isLoading}
      variant={variant}
      danger={danger}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </S.StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  handleClick: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'transparent']),
  danger: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
  isLoading: false,
  handleClick: null,
  variant: 'default',
  danger: PropTypes.false,
};
