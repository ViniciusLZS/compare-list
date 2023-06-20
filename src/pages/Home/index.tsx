import { Link } from 'react-router-dom';

import * as S from './styles';

import Logo from '../../assets/image/logo.svg';

import Button from '../../components/Button';
import Message from '../../components/Message';
import useHome from './useHome';

export default function Home() {
  const { authContext } = useHome();

  if (!authContext?.login) {
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

  return null;
}
