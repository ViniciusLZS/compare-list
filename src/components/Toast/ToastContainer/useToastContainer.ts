import { useCallback, useEffect, useState } from 'react';

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

export default function useToastContainer() {
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

  return { messages, handleRemoveMessage };
}
