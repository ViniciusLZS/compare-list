import PropTypes from 'prop-types';

import * as S from './styles';

import AlfabeticalSorting from '../../assets/image/icons/AlphabeticalSorting.svg';
import ListView from '../../assets/image/icons/listView.svg';
import gridView from '../../assets/image/icons/gridView.svg';
import orderCategory from '../../assets/image/icons/sort-ascending.svg';

interface List {
  name: string
}

interface PageHeaderProps {
  onHandleOrderBy: () => void;
  onHandleView: () => void;
  view: string;
  orderBy: string;
  list: List;
}

export default function PageHeader({
  onHandleOrderBy, onHandleView, view, orderBy, list,
}: PageHeaderProps) {
  return (
    <S.Container>
      <S.FormatView>
        <button type="button" onClick={onHandleOrderBy}>
          {orderBy === 'asc' ? (
            <img src={orderCategory} alt="Ordernar por categoria" />
          ) : (
            <img src={AlfabeticalSorting} alt="Ordernar por ordem alfabetica" />
          )}
        </button>
      </S.FormatView>

      <S.Span>{list.name}</S.Span>

      <S.FormatView>
        <button type="button" onClick={onHandleView}>
          {view === 'flex' ? (
            <img src={gridView} alt="Visualizar como grade" />
          ) : (
            <img src={ListView} alt="Visualizar como lista" />
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
  list: PropTypes.shape({
    createdAt: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};
