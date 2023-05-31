import ReactDOM from 'react-dom';

import * as S from './styles';

import Spinner from '../Spinner';

export default function Loader({ isLoading }: {isLoading: boolean}) {
  if (!isLoading) {
    return null;
  }

  const loaderRoot = document.getElementById('loader-root');
  if (!loaderRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <S.Overlay>
      <Spinner size={90} />
    </S.Overlay>,
    loaderRoot,
  );
}
