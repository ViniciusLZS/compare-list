import { Link, useHistory } from 'react-router-dom';

import { useContext, useEffect } from 'react';
import Logo from '../../assets/image/logo.svg';

import * as S from './styles';
import Button from '../../components/Button';
import Message from '../../components/Message';

import { AuthContext } from '../../context/AuthContext';

export default function Home() {
  const { login } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (login) {
      history.push('/profile');
    }
  }, [login, history]);

  if (!login) {
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
