import {
  createContext, useCallback, useEffect, useMemo, useState, ReactNode,
} from 'react';

import { useHistory } from 'react-router-dom';

import UserService from '../services/UserService';
import toast from '../utils/toast';

interface User {
  id: string;
  name: string;
  email: string;
}

export type AuthValue = {
  login: boolean;
  user: User | null;
  userLoginGoogle: (formData: {email: string ; name: string; sub: string })=> Promise<void>
  userLogin: (formData: { email: string; password: string }) => Promise<void>;
  userLogout: () => void;
};

export const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: {children: ReactNode}) {
  const [user, setUser] = useState<null | User>(null);
  const [login, setLogin] = useState(false);

  const history = useHistory();

  const getToken = useCallback(async (token: string) => {
    try {
      const response = await UserService.getUser(token);
      setUser(response);
      setLogin(true);
    } catch {}
  }, []);

  const userLoginGoogle = useCallback(async (formData
    :{email: string ; name: string; sub: string }) => {
    try {
      const token = await UserService.loginWithGoogle(formData);

      window.localStorage.setItem('token', token);

      await getToken(token);

      toast({
        type: 'success',
        text: 'Login feito com sucesso!',
      });

      history.push('/profile');
    } catch (error) {
      setLogin(false);
      toast({
        type: 'danger',
        text: 'Email ou senha invalido!',
      });
    }
  }, [getToken, history]);

  const userLogin = useCallback(async (formData: {
    email: string
    password: string
  }) => {
    try {
      const token = await UserService.login(formData);

      window.localStorage.setItem('token', token);

      await getToken(token);

      toast({
        type: 'success',
        text: 'Login feito com sucesso!',
      });

      history.push('/profile');
    } catch (error) {
      setLogin(false);
      toast({
        type: 'danger',
        text: 'Email ou senha invalido!',
      });
    }
  }, [getToken, history]);

  const userLogout = useCallback(
    () => {
      setLogin(false);
      window.localStorage.removeItem('token');
      history.push('/');
    },
    [history],
  );

  const autoLogin = useCallback(async () => {
    try {
      const token = window.localStorage.getItem('token');
      if (token) {
        await getToken(token);
      }
    } catch {
      setLogin(false);
      history.push('/');
    }
  }, [getToken, history]);

  useEffect(() => {
    autoLogin();
  }, [autoLogin]);

  const authValue = useMemo<AuthValue>(() => ({
    login, user, userLogin, userLogout, userLoginGoogle,
  }), [login, user, userLogin, userLogout, userLoginGoogle]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}
