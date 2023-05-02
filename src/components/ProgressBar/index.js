import { useEffect, useState } from 'react';
import * as S from './styles';

export default function ProgressBar() {
  const [percentege, setPercentege] = useState(0);

  const limit = 5000;
  const valueTotal = 3620;

  useEffect(() => {
    setPercentege((valueTotal / limit) * 100);
  }, [valueTotal]);

  return (
    <S.ContainerBar>
      <S.Bar percentege={percentege}>
        <div className="progress">
          <span>{valueTotal}</span>
        </div>
      </S.Bar>

      <S.ContainerSpan>
        <span>{limit}</span>
      </S.ContainerSpan>
    </S.ContainerBar>
  );
}
