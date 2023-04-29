import PropTypes from 'prop-types';

import * as S from './styles';

import Logo from '../../assets/image/logo.svg';
import ArrowBack from '../../assets/image/icons/arrow.svg';

export default function Header({ size }) {
  function handleBack() {
    window.history.back();
  }

  return (
    <S.Container>
      <S.Arrow type="button" onClick={() => handleBack()}>
        <img src={ArrowBack} alt="Seta para voltar" />
      </S.Arrow>

      <img src={Logo} alt="Logo" width={size} />
    </S.Container>
  );
}

Header.propTypes = {
  size: PropTypes.number,
};

Header.defaultProps = {
  size: 100,
};
