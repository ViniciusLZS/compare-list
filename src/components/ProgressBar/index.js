import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

import * as S from './styles';

export default function ProgressBar({ user }) {
  const [percentege, setPercentege] = useState(0);

  const valueTotal = 200;

  const numeroSemUltimosDigitos = Number(user.estimated).toString().slice(0, -2);

  useEffect(() => {
    setPercentege((valueTotal / numeroSemUltimosDigitos) * 100);
  }, [valueTotal, numeroSemUltimosDigitos]);

  return (
    <S.ContainerBar>
      <S.Bar percentege={percentege}>
        <div className="progress">
          <span>{valueTotal}</span>
        </div>
      </S.Bar>

      <S.ContainerSpan>
        <span>
          {`R$ ${numeroSemUltimosDigitos}`}
        </span>
      </S.ContainerSpan>
    </S.ContainerBar>
  );
}

ProgressBar.propTypes = {
  user: PropTypes.shape({
    createdAt: PropTypes.string,
    estimated: PropTypes.string,
  }).isRequired,
};
