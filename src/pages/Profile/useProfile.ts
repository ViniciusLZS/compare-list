import { useContext, useState } from 'react';

import { AuthContext } from '../../context/AuthContext';
import UserService from '../../services/UserService';
import toast from '../../utils/toast';

export default function useProfile() {
  const [isVisibledOptionsPhoto, setIsVisibledOptionsPhoto] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const authContext = useContext(AuthContext);
  const { user, getToken } = authContext || {};

  const token = localStorage.getItem('token') || '';

  // const date = new Date();
  // const hours = date.getHours();

  // let salute = '';
  // if (hours > 0 && hours < 13) {
  //   salute = 'Bom dia';
  // } else if (hours >= 13 && hours <= 18) {
  //   salute = 'Boa tarde';
  // } else {
  //   salute = 'Boa noite';
  // }

  function handleVisibledEditPhoto() {
    setIsVisibledOptionsPhoto((prevState) => !prevState);
  }

  async function handleEditPhoto(photo: string) {
    try {
      setIsLoading(true);
      await UserService.UpdatePhoto(token, photo);
      if (getToken) {
        getToken(token);
      }
      toast({
        type: 'success',
        text: 'Foto alterada com sucesso!',
        duration: 5000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao alterar a foto!',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return {
    handleVisibledEditPhoto, isVisibledOptionsPhoto, handleEditPhoto, user, isLoading,
  };
}
