import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

export default function useHome() {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (authContext?.login) {
      history.push('/profile');
    }
  }, [authContext, history]);

  return {
    authContext,
  };
}
