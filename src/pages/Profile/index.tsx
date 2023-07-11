import { Link } from 'react-router-dom';

import * as S from './styles';

import Button from '../../components/Button';
import useProfile from './useProfile';

export default function Profile() {
  const { salute, user } = useProfile();

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
