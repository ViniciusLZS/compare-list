import * as S from './styles';

interface SpinnerProps {
  size?: number;
}

export default function Spinner({ size = 32 }: SpinnerProps) {
  return <S.StyledSpinner size={size} />;
}
