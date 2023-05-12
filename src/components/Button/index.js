import PropTypes from 'prop-types';

import * as S from './styles';

import Spinner from '../Spinner';

export default function Button({
  children, disabled, isLoading, handleClick,
}) {
  return (
    <S.StyledButton onClick={handleClick} disabled={disabled || isLoading}>
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
};

Button.defaultProps = {
  disabled: false,
  isLoading: false,
  handleClick: null,
};
