import { useEffect, useState } from 'react';

import { useParams, Link } from 'react-router-dom';
import * as S from './styles';

import BodyList from '../../components/BodyList';
import PageHeader from '../../components/PageHeader';
import ProgressBar from '../../components/ProgressBar';
import Button from '../../components/Button';
import ListService from '../../services/ListService';
import StoreService from '../../services/StoreService';

export default function List() {
  const [view, setView] = useState('flex');
  const [orderBy, setOrderBy] = useState('asc');
  const [products, setProducts] = useState([]);
  const [hasError, setHasError] = useState(false);

  const [user, setUser] = useState({});

  const params = useParams();

  useEffect(() => {
    async function loadeProducts() {
      try {
        const listProducts = await ListService.listProducts(params);

        setHasError(false);

        setProducts(listProducts);
      } catch (error) {
        setHasError(true);
        console.log('error', error);
      }
    }
    loadeProducts();

    async function loadeStore() {
      try {
        const listStore = await StoreService.listStore(params);

        setUser(listStore);
      } catch (error) {
        console.log('error', error);
      }
    }
    loadeStore();
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
        <BodyList
          view={view}
          products={products}
          hasError={hasError}
        />

        <S.ButtonContainer>
          <Link to="/mylists"><Button type="button">Feito!</Button></Link>
          <Button type="button">Adicionar</Button>
        </S.ButtonContainer>
      </S.Content>
    </>
  );
}
