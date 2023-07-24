import { Link } from 'react-router-dom';

import * as S from './styles';

import useMenu from './useMenu';

import menu from '../../assets/image/icons/menu/menu.svg';
import profile from '../../assets/image/icons/menu/profile.svg';
import newList from '../../assets/image/icons/menu/addList.svg';
import myList from '../../assets/image/icons/menu/list.svg';
import logout from '../../assets/image/icons/menu/logout.svg';
import Setting from '../../assets/image/icons/menu/settings.svg';
import close from '../../assets/image/icons/close.svg';

export default function Menu() {
  const {
    login,
    handleDropdown,
    isVisible,
    shouldRender,
    animatedElementRef,
    activeItem,
    handleItemClick,
    handleLogout,
  } = useMenu();

  if (!login) {
    return null;
  }

  return (
    <S.Container>
      <button className="menu" type="button" onClick={handleDropdown}>
        {isVisible ? <img src={close} alt="x" /> : <img src={menu} alt="Menu" />}
      </button>

      { shouldRender && (
      <S.Dropdown isLeaving={!isVisible} ref={animatedElementRef}>
        <ul>
          <li className={activeItem === '/profile' ? 'active' : ''}>
            <Link to="/profile" onClick={() => handleItemClick('/profile')}>
              <img src={profile} alt="perfil" />
              Perfil
            </Link>
          </li>

          <li className={activeItem === '/newlist' ? 'active' : ''}>
            <Link to="/newlist" onClick={() => handleItemClick('/newlist')}>
              <img src={newList} alt="Nova lista" />
              Nova lista
            </Link>
          </li>

          <li className={activeItem === '/mylists' ? 'active' : ''}>
            <Link to="/mylists" onClick={() => handleItemClick('/mylists')}>
              <img src={myList} alt="Listas" />
              Minhas listas
            </Link>
          </li>

          <li className={activeItem === '/settings' ? 'active' : ''}>
            <Link to="/settings" onClick={() => handleItemClick('/settings')}>
              <img src={Setting} alt="Configurações" />
              Configurações
            </Link>
          </li>

          <li>
            <button type="button" onClick={handleLogout}>
              <img src={logout} alt="Sair" />
              Sair
            </button>
          </li>
        </ul>
      </S.Dropdown>
      )}
    </S.Container>
  );
}
