import { useEffect, useState } from 'react';

import { useParams, Link } from 'react-router-dom';

import * as S from './styles';

import StoreService from '../../services/StoreService';
import ListService from '../../services/ListService';

import BodyList from '../../components/BodyList';
import PageHeader from '../../components/PageHeader';
import ProgressBar from '../../components/ProgressBar';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

export default function List() {
  const [view, setView] = useState('flex');
  const [orderBy, setOrderBy] = useState('asc');
  const [products, setProducts] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [store, setStore] = useState({});
  const [modal, setModal] = useState(false);

  const params = useParams();

  useEffect(() => {
    async function loadeProducts() {
      try {
        setIsLoading(true);

        const listProducts = await ListService.listProducts(params);

        setHasError(false);

        setProducts(listProducts);
      } catch (error) {
        setHasError(true);
        console.log('error', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadeProducts();

    async function loadeStore() {
      try {
        const listStore = await StoreService.listStore(params);

        setStore(listStore);
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

  function handleModal() {
    setModal(
      (prevState) => (prevState === 'false' ? 'true' : 'false'),
    );
  }

  return (
    <>
      {modal && (
        <Modal />
      )}

      <S.Header>
        <ProgressBar user={store} />

        <PageHeader
          onHandleOrderBy={() => handleOrderBy()}
          onHandleView={() => handleView()}
          view={view}
          orderBy={orderBy}
          user={store}
        />
      </S.Header>

      <S.Content>
        <BodyList
          view={view}
          products={products}
          hasError={hasError}
          isLoading={isLoading}
        />

        <S.ButtonContainer>
          <Link to="/mylists"><Button type="button">Feito!</Button></Link>
          <Button type="button" handleClick={() => handleModal()}>Adicionar</Button>
        </S.ButtonContainer>
      </S.Content>
    </>
  );
}
