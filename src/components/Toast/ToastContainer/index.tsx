import { useCallback, useEffect, useState } from 'react';
import * as S from './styles';
import ToastMessage from '../ToastMessage';
import { toastEventManager } from '../../../utils/toast';

interface Message {
  id: number;
  type: string;
  text: string;
  duration: number;
}

interface HandleAddToastProps {
  type: string;
  text: string;
  duration: number;
}

export default function ToastContainer() {
  const [messages, setMessage] = useState <Message[]>([]);

  useEffect(() => {
    function handleAddToast({ type, text, duration }: HandleAddToastProps) {
      setMessage((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          type,
          text,
          duration,
        },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  const handleRemoveMessage = useCallback((id: number) => {
    setMessage((prevState) => prevState.filter((message) => message.id !== id));
  }, []);

  return (
    <S.Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </S.Container>
  );
}
