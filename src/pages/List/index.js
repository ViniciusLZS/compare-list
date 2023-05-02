import { useState } from 'react';
import * as S from './styles';

import BodyList from '../../components/BodyList';
import PageHeader from '../../components/PageHeader';
import ProgressBar from '../../components/ProgressBar';
import Button from '../../components/Button';

export default function List() {
  const [view, setView] = useState('flex');
  const [orderBy, setOrderBy] = useState('asc');

  function handleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'category' : 'asc'),
    );
  }

  function handleView() {
    setView(
      (prevState) => (prevState === 'flex' ? 'grid' : 'flex'),
    );
  }

  return (
    <>
      <S.Header>
        <ProgressBar />

        <PageHeader
          onHandleOrderBy={() => handleOrderBy()}
          onHandleView={() => handleView()}
          view={view}
          orderBy={orderBy}
        />
      </S.Header>

      <S.Content>
        <BodyList view={view} />

        <S.ButtonContainer>
          <Button type="button">Feito!</Button>
          <Button type="button">Adicionar</Button>
        </S.ButtonContainer>
      </S.Content>
    </>
  );
}
