import { useEffect, useState } from 'react';

import { useParams, Link } from 'react-router-dom';

import * as S from './styles';

import ListService from '../../services/ListService';

import BodyList from '../../components/BodyList';
import PageHeader from '../../components/PageHeader';
import ProgressBar from '../../components/ProgressBar';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import ProductService from '../../services/ProductService';

export default function List() {
  const [view, setView] = useState('flex');
  const [orderBy, setOrderBy] = useState('asc');
  const [products, setProducts] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState({});
  const [modal, setModal] = useState(false);

  const params = useParams();

  useEffect(() => {
    async function loadeProducts() {
      try {
        setIsLoading(true);

        const listProducts = await ProductService.listProducts({ params, orderBy });

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
        const allList = await ListService.listAll(orderBy);

        setList(allList);
      } catch (error) {
        console.log('error', error);
      }
    }
    loadeStore();
  }, [params, orderBy]);

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
        <ProgressBar list={list} />

        <PageHeader
          onHandleOrderBy={() => handleOrderBy()}
          onHandleView={() => handleView()}
          view={view}
          orderBy={orderBy}
          list={list}
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
