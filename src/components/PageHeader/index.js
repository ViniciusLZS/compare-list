import PropTypes from 'prop-types';

import * as S from './styles';

import AlfabeticalSorting from '../../assets/image/icons/AlphabeticalSorting.svg';
import ListView from '../../assets/image/icons/listView.svg';
import gridView from '../../assets/image/icons/gridView.svg';
import orderCategory from '../../assets/image/icons/sort-ascending.svg';

export default function PageHeader({
  onHandleOrderBy, onHandleView, view, orderBy,
}) {
  return (
    <S.Container>
      <S.FormatView>
        <button type="button" onClick={onHandleOrderBy}>
          {orderBy === 'asc' ? (
            <img src={AlfabeticalSorting} alt="Ordernar por ordem alfabetica" />
          ) : (
            <img src={orderCategory} alt="Ordernar por categoria" />
          )}
        </button>
      </S.FormatView>

      <S.Span>Mercadão de Petrolia</S.Span>

      <S.FormatView>
        <button type="button" onClick={onHandleView}>
          {view === 'flex' ? (
            <img src={ListView} alt="Visualizar como lista" />
          ) : (
            <img src={gridView} alt="Visualizar como grade" />
          )}
        </button>
      </S.FormatView>
    </S.Container>
  );
}

PageHeader.propTypes = {
  onHandleOrderBy: PropTypes.func.isRequired,
  onHandleView: PropTypes.func.isRequired,
  orderBy: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
};
