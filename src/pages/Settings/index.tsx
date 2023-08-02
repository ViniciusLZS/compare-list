import { Link } from 'react-router-dom';

import * as S from './styles';

import userData from '../../assets/image/icons/settings/userData.svg';
import DataSecurity from '../../assets/image/icons/settings/dataSecurity.svg';
import Arrow from '../../assets/image/icons/settings/rightArrow.svg';

export default function Settings() {
  return (
    <S.Container>
      <h1>Configurações</h1>

      <S.Content>
        <Link to="user-data">
          <div>
            <div>
              <img src={userData} alt="Dados do usuário." />
              <h2>Dados pessoais</h2>
            </div>
            <img src={Arrow} alt="Seta para direita." />
          </div>
        </Link>
        <Link to="data-security">
          <div>
            <div>
              <img src={DataSecurity} alt="Segurança de dados." />
              <h2>Senha e segurança</h2>
            </div>
            <img src={Arrow} alt="Seta para direita." />
          </div>
        </Link>
      </S.Content>
    </S.Container>
  );
}
