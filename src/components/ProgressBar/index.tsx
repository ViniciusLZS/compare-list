import * as S from './styles';
import useProgressBar from './useProgressBar';
import maskMoney from '../../utils/maskMoney';

export default function ProgressBar({ list }: {list: {estimated: number, total: number}}) {
  const {
    percentege,
    valueTotal,
    estimatedNumber,
    exceededLimit,
  } = useProgressBar({ list });

  return (
    <S.ContainerBar>
      <S.Bar
        percentege={percentege}
        exceededLimit={exceededLimit}
      >
        <div className="progress">
          <span>{valueTotal ? maskMoney(valueTotal.toString()) : 'R$ 0,00'}</span>
        </div>
      </S.Bar>

      <S.ContainerSpan>
        <span>
          {maskMoney(estimatedNumber.toString())}
        </span>
      </S.ContainerSpan>
    </S.ContainerBar>
  );
}
