import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

import * as S from './styles';

export default function ProgressBar({ list }) {
  const [percentege, setPercentege] = useState(0);

  const valueTotal = 200;

  const numberWithoutLastDigits = Number(list.estimated).toString().slice(0, -2);

  useEffect(() => {
    setPercentege((valueTotal / numberWithoutLastDigits) * 100);
  }, [valueTotal, numberWithoutLastDigits]);

  return (
    <S.ContainerBar>
      <S.Bar percentege={percentege}>
        <div className="progress">
          <span>{valueTotal}</span>
        </div>
      </S.Bar>

      <S.ContainerSpan>
        <span>
          {`R$ ${numberWithoutLastDigits}`}
        </span>
      </S.ContainerSpan>
    </S.ContainerBar>
  );
}

ProgressBar.propTypes = {
  list: PropTypes.shape({
    createdAt: PropTypes.string,
    estimated: PropTypes.string,
  }).isRequired,
};
