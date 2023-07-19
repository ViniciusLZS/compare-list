import * as S from './styles';

import Spinner from '../Spinner';
import ReactPortal from '../ReactPortal';
import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

export default function Loader({ isLoading }: {isLoading: boolean}) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(isLoading);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="loader-root">
      <S.Overlay
        isLeaving={!isLoading}
        ref={animatedElementRef}
      >
        <Spinner size={90} />
      </S.Overlay>
    </ReactPortal>
  );
}
