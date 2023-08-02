import * as S from './styles';

import InputSearch from '../InputSearch';

import AlfabeticalSorting from '../../assets/image/icons/AlphabeticalSorting.svg';
import ListView from '../../assets/image/icons/listView.svg';
import gridView from '../../assets/image/icons/gridView.svg';
import orderData from '../../assets/image/icons/sort-ascending.svg';
import Search from '../../assets/image/icons/search.svg';

interface List {
  name: string
}

interface PageHeaderProps {
  onOrderBy: () => void;
  onView: () => void;
  onVisibleSearch: () => void;
  isVisibleSearch: boolean;
  view: string;
  orderBy: string;
  list: List;
  disabledOrderButton?: boolean;
  hasError: boolean;
  searchTerm: string;
  OnChangeSearchTerm: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PageHeader({
  onOrderBy,
  onView,
  onVisibleSearch,
  isVisibleSearch,
  view,
  orderBy,
  list,
  disabledOrderButton = false,
  hasError,
  searchTerm,
  OnChangeSearchTerm,
}: PageHeaderProps) {
  if (!hasError) {
    return (
      <S.Container>
        { !disabledOrderButton && (
        <S.FormatView>
          <button type="button" onClick={onOrderBy}>
            {orderBy === 'name' ? (
              <img src={orderData} alt="Ordernar por data" />
            ) : (
              <img src={AlfabeticalSorting} alt="Ordernar por ordem alfabetica" />
            )}
          </button>
        </S.FormatView>
        )}

        {isVisibleSearch
          ? (
            <InputSearch
              value={searchTerm}
              onChange={OnChangeSearchTerm}
              placeholder="Pesquise pelos produtos aqui!"
            />
          )
          : <S.Title>{list.name}</S.Title>}

        {!disabledOrderButton && (
        <S.FormatView>
          <button type="button" onClick={onVisibleSearch}>
            <img src={Search} alt="Busca" />
          </button>

          <button className="gridView" type="button" onClick={onView}>
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
