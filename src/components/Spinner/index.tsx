import PropTypes from 'prop-types';

import * as S from './styles';

interface SpinnerProps {
  size?: number;
}

export default function Spinner({ size = 32 }: SpinnerProps) {
  return <S.StyledSpinner size={size} />;
}

Spinner.propTypes = {
  size: PropTypes.number,
};

Spinner.defaultProps = {
  size: 32,
};
