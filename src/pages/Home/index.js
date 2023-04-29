import { Link } from 'react-router-dom';

import Header from '../../components/Header';

import * as S from './styles';
import Button from '../../components/Button';

export default function Home() {
  return (
    <S.Container>
      <Header size={200} />

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
