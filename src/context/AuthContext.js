import PropTypes from 'prop-types';
import {
  createContext, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useHistory } from 'react-router-dom';

import UserService from '../services/UserService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  console.log('🚀 ~ file: AuthContext.js:13 ~ AuthProvider ~ user:', user?.name);
  const [login, setLogin] = useState(false);
  console.log('🚀 ~ file: AuthContext.js:15 ~ AuthProvider ~ login:', login);

  const history = useHistory();

  const getToken = useCallback(async (token) => {
    const response = await UserService.getUser(token);
    setUser(response);
    setLogin(true);
    history.push('/profile');
  }, [history]);

  const userLogin = useCallback(async (formData) => {
    try {
      const token = await UserService.login(formData);

      window.localStorage.setItem('token', token);

      await getToken(token);
    } catch (error) {
      setLogin(false);
      console.log({ error });
    }
  }, [getToken]);

  const userLogout = useCallback(
    async () => {
      setLogin(false);
      window.localStorage.removeItem('token');

      history.push('/');
    },
    [history],
  );

  useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        await getToken(token);
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout, getToken]);

  const authValue = useMemo(() => ({
    login, user, userLogin, userLogout,
  }), [login, user, userLogin, userLogout]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
