import { useContext } from 'react';

import { AuthContext } from '../../context/AuthContext';

export default function useProfile() {
  const authContext = useContext(AuthContext);
  const { user } = authContext || {};

  const date = new Date();
  const hours = date.getHours();

  let salute = '';
  if (hours > 0 && hours < 13) {
    salute = 'Bom dia';
  } else if (hours >= 13 && hours <= 18) {
    salute = 'Boa tarde';
  } else {
    salute = 'Boa noite';
  }

  return { salute, user };
}
