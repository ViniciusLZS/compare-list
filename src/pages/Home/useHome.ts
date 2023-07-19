import {
  useContext, useEffect, useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

declare global {
  interface Window {
    google: any;
    // eslint-disable-next-line camelcase
    jwt_decode: any;
  }
}

export default function useHome() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authContext?.login) {
      navigate('/profile');
    }
  }, [authContext, navigate]);

  const initializeGoogleOneTap = useCallback(() => {
    function handleCredentialResponse(response: any) {
      const { credential } = response;
      const data = window.jwt_decode(credential);
      if (authContext) {
        authContext?.userLoginGoogle({
          email: data.email,
          name: data.name,
          sub: data.sub,
        });
      }
    }

    if (!authContext?.login) {
      window.google.accounts.id.initialize({
        client_id: '884705100859-kkuhiq1vg602d790rr5qf92fkmvbgoeh.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('buttonGoogle'),
        {
          size: 'large',
          type: 'standard',
          shape: 'pill',
          theme: 'outline',
          text: 'continuar com',
          logo_alignment: 'left',
        }, // customization attributes
      );
    }

    window.google.accounts.id.prompt(); // also display the One Tap dialog
  }, [authContext]);

  useEffect(() => {
    initializeGoogleOneTap();
  }, [initializeGoogleOneTap]);

  return {
    authContext,
  };
}
