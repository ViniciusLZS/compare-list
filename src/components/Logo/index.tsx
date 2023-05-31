import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import * as S from './styles';

import LogoSvg from '../../assets/image/logo.svg';
import ArrowBack from '../../assets/image/icons/arrow.svg';

export default function Logo({ size = 32 }) {
  function handleBack() {
    window.history.back();
  }

  return (
    <S.Container>
      <S.Arrow type="button" onClick={() => handleBack()}>
        <img src={ArrowBack} alt="Seta para voltar" />
      </S.Arrow>

      <Link to="/"><img src={LogoSvg} alt="Logo" width={size} /></Link>
    </S.Container>
  );
}

Logo.propTypes = {
  size: PropTypes.number,
};

Logo.defaultProps = {
  size: 100,
};
