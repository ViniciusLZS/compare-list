import * as S from './styles';

import AlfabeticalSorting from '../../assets/image/icons/AlphabeticalSorting.svg';
import ListView from '../../assets/image/icons/listView.svg';
import gridView from '../../assets/image/icons/gridView.svg';
import orderData from '../../assets/image/icons/sort-ascending.svg';

interface List {
  name: string
}

interface PageHeaderProps {
  onHandleOrderBy: () => void;
  onHandleView: () => void;
  view: string;
  orderBy: string;
  list: List;
  // eslint-disable-next-line react/require-default-props
  disabledOrderButton?: boolean;
  hasError: boolean;
}

export default function PageHeader({
  onHandleOrderBy, onHandleView, view, orderBy, list, disabledOrderButton = false, hasError,
}: PageHeaderProps) {
  if (!hasError) {
    return (
      <S.Container>
        { !disabledOrderButton && (
        <S.FormatView>
          <button type="button" onClick={onHandleOrderBy}>
            {orderBy === 'name' ? (
              <img src={orderData} alt="Ordernar por data" />
            ) : (
              <img src={AlfabeticalSorting} alt="Ordernar por ordem alfabetica" />
            )}
          </button>
        </S.FormatView>
        )}

        <S.Title>{list.name}</S.Title>

        {!disabledOrderButton && (
        <S.FormatView>
          <button className="gridView" type="button" onClick={onHandleView}>
            {view === 'flex' ? (
              <img src={gridView} alt="Visualizar como grade" />
            ) : (
              <img src={ListView} alt="Visualizar como lista" />
            )}
          </button>
        </S.FormatView>
        )}
      </S.Container>
    );
  }
  return null;
}
