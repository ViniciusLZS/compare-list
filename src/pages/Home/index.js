import { Link } from 'react-router-dom';

import Logo from '../../assets/image/logo.svg';

import * as S from './styles';
import Button from '../../components/Button';

export default function Home() {
  return (
    <S.Container>
      <img src={Logo} alt="Logo" />

      <div className="buttons">
        <Link to="/new">
          <Button>
            Começar
          </Button>
        </Link>

        <Link to="/">
          <Button>
            Minhas Listas
          </Button>
        </Link>
      </div>

    </S.Container>
  );
}
