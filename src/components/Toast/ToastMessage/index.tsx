import { useEffect } from 'react';

import { Container } from './styles';

interface ToastMessageProps {
  message: {
    id: number;
    type: string;
    text: string;
    duration?: number;
  };
  onRemoveMessage: (id: number) => void;
}

export default function ToastMessage({ message, onRemoveMessage }: ToastMessageProps) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      type={message.type}
      onClick={() => handleRemoveToast()}
      tabIndex={0}
      role="button"
    >
      <strong>{message.text}</strong>
    </Container>
  );
}
