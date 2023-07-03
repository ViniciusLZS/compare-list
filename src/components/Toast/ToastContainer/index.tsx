import * as S from './styles';
import ToastMessage from '../ToastMessage';
import useToastContainer from './useToastContainer';

export default function ToastContainer() {
  const { handleRemoveItem, renderList } = useToastContainer();

  return (
    <S.Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItem}
          isLeaving={isLeaving}
          animatedRef={animatedRef}
        />
      ))}
    </S.Container>
  );
}
