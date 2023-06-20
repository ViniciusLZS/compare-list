import PropTypes from 'prop-types';

import * as S from './styles';
import useProgressBar from './useProgressBar';

export default function ProgressBar({ list }: {list: {estimated: number}}) {
  const { percentege, valueTotal, numberWithoutLastDigits } = useProgressBar({ list });

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
    estimated: PropTypes.number,
  }).isRequired,
};
