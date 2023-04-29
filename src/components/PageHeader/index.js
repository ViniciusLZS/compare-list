import * as S from './styles';

import AlfabeticalSorting from '../../assets/image/icons/AlphabeticalSorting.svg';
import ListView from '../../assets/image/icons/listView.svg';
import gridView from '../../assets/image/icons/gridView.svg';
import orderCategory from '../../assets/image/icons/sort-ascending.svg';

export default function PageHeader() {
  return (
    <S.Container>
      <S.FormatView>
        <button type="button">
          <img src={orderCategory} alt="Ordernar por categoria" />
        </button>
        <button type="button">
          <img src={AlfabeticalSorting} alt="Ordernar por ordem alfabetica" />
        </button>
      </S.FormatView>
      <S.Span>Mercadão de Petrolia</S.Span>
      <S.FormatView>
        <button type="button">
          <img src={ListView} alt="Ordernar por categoria" />
        </button>
        <button type="button">
          <img src={gridView} alt="Ordernar por ordem alfabetica" />
        </button>
      </S.FormatView>
    </S.Container>
  );
}
