import { useEffect } from 'react';

import { toastEventManager } from '../../../utils/toast';
import useAnimatedList from '../../../hooks/useAnimatedList';

interface Message {
  id: string;
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
  const {
    items: messages,
    setItems: setMessages,
    handleRemoveItem,
    renderList,
  } = useAnimatedList();

  useEffect(() => {
    function handleAddToast({ type, text, duration }: HandleAddToastProps) {
      setMessages((prevState: Message[]) => [
        ...prevState,
        {
          id: Math.random().toString(),
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
  }, [setMessages]);

  return { messages, handleRemoveItem, renderList };
}
