import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import * as S from './styles';

import BodyList from '../../components/BodyList';
import PageHeader from '../../components/PageHeader';
import ProgressBar from '../../components/ProgressBar';
import Button from '../../components/Button';

export default function List() {
  const [view, setView] = useState('flex');
  const [orderBy, setOrderBy] = useState('asc');
  const [products, setProducts] = useState([]);

  const [user, setUser] = useState({});

  const params = useParams();

  useEffect(() => {
    fetch(`https://64530c54bce0b0a0f7547089.mockapi.io/comparelist/v1/newlist/${params.id}/products`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (response) => {
        const json = await response.json();
        setProducts(json);
      });

    fetch(`https://64530c54bce0b0a0f7547089.mockapi.io/comparelist/v1/newlist/${params.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (response) => {
        const userJson = await response.json();
        setUser(userJson);
      });
  }, [params]);

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
        <ProgressBar user={user} />

        <PageHeader
          onHandleOrderBy={() => handleOrderBy()}
          onHandleView={() => handleView()}
          view={view}
          orderBy={orderBy}
          user={user}
        />
      </S.Header>

      <S.Content>
        <BodyList view={view} products={products} />

        <S.ButtonContainer>
          <Button type="button">Feito!</Button>
          <Button type="button">Adicionar</Button>
        </S.ButtonContainer>
      </S.Content>
    </>
  );
}
