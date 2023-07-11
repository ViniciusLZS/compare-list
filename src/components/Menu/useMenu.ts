import {
  useContext, useEffect, useState,
} from 'react';

import { AuthContext } from '../../context/AuthContext';

import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

export default function useMenu() {
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

  useEffect(() => {
    setActiveItem(window.location.pathname);
  }, [isVisible]);

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

  return {
    login,
    handleDropdown,
    isVisible,
    shouldRender,
    animatedElementRef,
    activeItem,
    handleItemClick,
    handleLogout,
  };
}
