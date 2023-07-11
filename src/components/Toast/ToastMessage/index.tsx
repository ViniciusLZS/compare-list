import { memo, useEffect } from 'react';

import { Container } from './styles';

interface ToastMessageProps {
  message: {
    id: string;
    type: string;
    text: string;
    duration?: number;
  };
  onRemoveMessage: (id: string) => void;
  isLeaving: boolean;
  animatedRef: React.RefObject<any>;
}

function ToastMessage({
  message, onRemoveMessage, isLeaving, animatedRef,
}: ToastMessageProps) {
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
      isLeaving={isLeaving}
      ref={animatedRef}
    >
      <strong>{message.text}</strong>
    </Container>
  );
}

export default memo(ToastMessage);
