import { Link, useLocation } from 'react-router-dom';
import * as S from './styles';

import LogoSvg from '../../assets/image/logo.svg';
import ArrowBack from '../../assets/image/icons/arrow.svg';
import Menu from '../Menu';

export default function Logo({ size = 100 }) {
  function handleBack() {
    window.history.back();
  }
  const { pathname } = useLocation();
  if (pathname.length === 1) {
    return null;
  }

  return (
    <S.Container>
      <S.Arrow type="button" onClick={() => handleBack()}>
        <img src={ArrowBack} alt="Seta para voltar" />
      </S.Arrow>
      <S.Logo>
        <Link to="/"><img src={LogoSvg} alt="Logo" width={size} /></Link>
      </S.Logo>

      <S.Menu>
        <Menu />
      </S.Menu>
    </S.Container>
  );
}
