import * as S from './styles';

export default function ProgressBar() {
  return (
    <S.ContainerBar>
      <S.Bar>
        <div className="progress">
          <span>100.00</span>
        </div>
      </S.Bar>

      <S.ContainerSpan>
        <span>100.00</span>
      </S.ContainerSpan>
    </S.ContainerBar>
  );
}
