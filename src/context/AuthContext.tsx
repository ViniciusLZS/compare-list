import {
  createContext, useCallback, useEffect, useMemo, useState, ReactNode,
} from 'react';

import { useNavigate } from 'react-router-dom';

import UserService from '../services/UserService';
import toast from '../utils/toast';

interface UserProps {
  id: string;
  photo: string;
  name: string;
  email: string;
}

export type AuthValue = {
  login: boolean;

  user: UserProps | null;

  userLoginGoogle: (formData: {
    photo: string;
    email: string ;
    name: string;
    sub: string;
  })=> Promise<void>;

  userLogin: (formData: { email: string; password: string }) => Promise<void>;

  userLogout: () => void;
  getToken: (token: string) => Promise<void>;
};

export const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: {children: ReactNode}) {
  const [user, setUser] = useState<null | UserProps>(null);
  const [login, setLogin] = useState(false);

  const navigate = useNavigate();

  const getToken = useCallback(async (token: string) => {
    try {
      const response = await UserService.getUser(token);
      setUser(response);
      setLogin(true);
    } catch {}
  }, []);

  const userLoginGoogle = useCallback(async (formData
    :{photo: string; email: string ; name: string; sub: string }) => {
    try {
      const token = await UserService.loginWithGoogle(formData);

      window.localStorage.setItem('token', token);

      await getToken(token);

      toast({
        type: 'success',
        text: 'Login feito com sucesso!',
      });
      navigate('/profile', { replace: true });
    } catch (error) {
      setLogin(false);
      toast({
        type: 'danger',
        text: 'Email ou senha invalido!',
      });
    }
  }, [getToken, navigate]);

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

      navigate('/profile', { replace: true });
    } catch (error) {
      setLogin(false);
      toast({
        type: 'danger',
        text: 'Email ou senha invalido!',
      });
    }
  }, [getToken, navigate]);

  const userLogout = useCallback(
    () => {
      setLogin(false);
      window.localStorage.removeItem('token');
      navigate('/', { replace: true });
    },
    [navigate],
  );

  const autoLogin = useCallback(async () => {
    try {
      const token = window.localStorage.getItem('token');
      if (token && !login) {
        await getToken(token);
      }
    } catch {
      setLogin(false);
      navigate('/', { replace: true });
    }
  }, [getToken, navigate, login]);

  useEffect(() => {
    autoLogin();
  }, [autoLogin]);

  const authValue = useMemo<AuthValue>(() => ({
    login, user, userLogin, userLogout, userLoginGoogle, getToken,
  }), [login, user, userLogin, userLogout, userLoginGoogle, getToken]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}
