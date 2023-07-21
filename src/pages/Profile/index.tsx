import { Link } from 'react-router-dom';

import * as S from './styles';

import useProfile from './useProfile';

import ProfileMan from '../../assets/image/profile/profileMan.svg';
import ProfileGirl from '../../assets/image/profile/profileGirl.svg';
import Edit from '../../assets/image/icons/myList/edit.svg';
import Spinner from '../../components/Spinner';

export default function Profile() {
  const {
    handleVisibledEditPhoto, isVisibledOptionsPhoto, handleEditPhoto, user, isLoading,
  } = useProfile();

  return (
    <S.Container>
      <S.Image>
        {isLoading && (
        <S.SpinnerContainer>
          <Spinner />
        </S.SpinnerContainer>
        )}
        <button type="button" onClick={handleVisibledEditPhoto}>
          {user?.photo === 'profileMan' && <img src={ProfileMan} alt="Foto do perfil" />}
          {user?.photo === 'profileGirl' && <img src={ProfileGirl} alt="Foto do perfil" />}
          {(user?.photo !== 'profileMan' || 'profileGirl') && <img src={user?.photo} alt="Foto do perfil" />}
          {!user?.photo && <img src={Edit} alt="Editar" />}
        </button>

        {isVisibledOptionsPhoto && (
        <S.OptionsPhoto onClick={handleVisibledEditPhoto}>
          <button type="button" onClick={() => handleEditPhoto('profileMan')}>
            <img src={ProfileMan} alt="Editar" />
          </button>
          <button type="button" onClick={() => handleEditPhoto('profileGirl')}>
            <img src={ProfileGirl} alt="Editar" />
          </button>
        </S.OptionsPhoto>
        )}
      </S.Image>

      <S.Info>
        <span>{user?.name}</span>
        <span>{user?.email}</span>
      </S.Info>

      <S.Content>
        <Link to="/newlist">
          <S.Card>
            <span>Nova lista</span>
            <p>
              Crie uma lista com o nome do local
              onde você irá comprar e um valor
              estimado de quanto deseja gastar.
            </p>
          </S.Card>
        </Link>
        <Link to="/mylists">
          <S.Card>
            <span>Minhas listas</span>
            <p>
              Todas as suas listas estão aqui!
              Edite, faça copia e compare para
              ter mais controle financeiro.
            </p>
          </S.Card>
        </Link>
      </S.Content>
    </S.Container>
  );
}
