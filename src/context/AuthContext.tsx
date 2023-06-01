import {
  createContext, useCallback, useEffect, useMemo, useState, ReactNode,
} from 'react';

import { useHistory } from 'react-router-dom';

import UserService from '../services/UserService';

interface User {
  id: number;
  name: string;
  email: string;
}

export type AuthValue = {
  login: boolean;
  user: User | null;
  userLogin: (formData: { email: string; password: string }) => Promise<void>;
  userLogout: () => Promise<void>;
};

export const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: {children: ReactNode}) {
  const [user, setUser] = useState<null | User>(null);
  const [login, setLogin] = useState(false);

  const history = useHistory();

  const getToken = useCallback(async (token: string) => {
    const response = await UserService.getUser(token);
    setUser(response);
    setLogin(true);
  }, []);

  const userLogin = useCallback(async (formData: {
    email: string
    password: string
  }) => {
    try {
      const token = await UserService.login(formData);

      window.localStorage.setItem('token', token);

      await getToken(token);

      history.push('/profile');
    } catch (error) {
      setLogin(false);
      console.log({ error });
    }
  }, [getToken, history]);

  const userLogout = useCallback(
    async () => {
      setLogin(false);
      window.localStorage.removeItem('token');
    },
    [],
  );

  useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        await getToken(token);
      } else {
        setLogin(false);
        history.push('/');
      }
    }
    autoLogin();
  }, [userLogout, getToken, history]);

  const authValue = useMemo<AuthValue>(() => ({
    login, user, userLogin, userLogout,
  }), [login, user, userLogin, userLogout]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}
