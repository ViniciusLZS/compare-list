import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Link } from 'react-router-dom';

import * as S from './styles';

import { AuthContext } from '../../context/AuthContext';

import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

import menu from '../../assets/image/icons/menu/menu.svg';
import profile from '../../assets/image/icons/menu/profile.svg';
import newList from '../../assets/image/icons/menu/addList.svg';
import myList from '../../assets/image/icons/menu/list.svg';
import logout from '../../assets/image/icons/menu/logout.svg';
import close from '../../assets/image/icons/close.svg';

export default function Menu() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeItem, setActiveItem] = useState('');

  const authContext = useContext(AuthContext);
  const { userLogout, login } = authContext || {};

  const { animatedElementRef, shouldRender } = useAnimatedUnmount(isVisible);

  useEffect(() => {
    function handleCloseDropdown(event: MouseEvent) {
      if (
        animatedElementRef.current
        && !animatedElementRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    }
    if (isVisible) {
      document.addEventListener('click', handleCloseDropdown);
    }

    return () => {
      document.removeEventListener('click', handleCloseDropdown);
    };
  }, [animatedElementRef, isVisible]);

  function handleDropdown() {
    setIsVisible((prevState) => !prevState);
  }

  function handleItemClick(item: string) {
    setActiveItem(item);
  }

  function handleLogout() {
    if (userLogout) {
      userLogout();
    }
  }

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
          <li className={activeItem === 'profile' ? 'active' : ''}>
            <Link to="/profile" onClick={() => handleItemClick('profile')}>
              <img src={profile} alt="perfil" />
              Perfil
            </Link>
          </li>

          <li className={activeItem === 'newlist' ? 'active' : ''}>
            <Link to="/newlist" onClick={() => handleItemClick('newlist')}>
              <img src={newList} alt="Nova lista" />
              Nova lista
            </Link>
          </li>

          <li className={activeItem === 'mylists' ? 'active' : ''}>
            <Link to="/mylists" onClick={() => handleItemClick('mylists')}>
              <img src={myList} alt="Listas" />
              Minhas listas
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
