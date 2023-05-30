import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

export default function ProtectedRouter({ children }) {
  const { login } = useContext(AuthContext);

  const history = useHistory();

  return login ? children : history.push('/');
}
