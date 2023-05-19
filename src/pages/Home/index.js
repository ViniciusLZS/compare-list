import { Link } from 'react-router-dom';

import Logo from '../../assets/image/logo.svg';

import * as S from './styles';
import Button from '../../components/Button';
import Message from '../../components/Message';

export default function Home() {
  return (
    <S.Container>
      <img src={Logo} alt="Logo" />

      <div className="buttons">
        <Link to="/signin">
          <Button>
            Login
          </Button>
        </Link>

        <Link to="/signup">
          <Button variant="transparent">
            Cadastre-se
          </Button>
        </Link>
      </div>

      <Message />
    </S.Container>
  );
}
