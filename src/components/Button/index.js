import PropTypes from 'prop-types';
import * as S from './styles';

export default function Button({ children }) {
  return (
    <S.StyledButton>
      {children}
    </S.StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
};
