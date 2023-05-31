import { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

import * as S from './styles';

import Logo from '../../assets/image/logo.svg';

import Button from '../../components/Button';
import Message from '../../components/Message';

export default function Home() {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (authContext?.login) {
      history.push('/profile');
    }
  }, [authContext, history]);

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
