import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

import * as S from './styles';

import Button from '../../components/Button';

export default function Profile() {
  const { user } = useContext(AuthContext);

  const date = new Date();
  const hours = date.getHours();

  let salute = '';
  if (hours > 0 && hours < 13) {
    salute = 'Bom dia';
  } if (hours > 13 && hours < 18) {
    salute = 'Boa tarde';
  } else {
    salute = 'Boa noite';
  }

  return (
    <S.Container>
      <h1>{`${salute}, ${user?.name}`}</h1>

      <S.Content>
        <Link to="/newlist">
          <Button>Nova lista</Button>
        </Link>
        <Link to="/mylists">
          <Button>Minhas listas</Button>
        </Link>
      </S.Content>
    </S.Container>
  );
}
