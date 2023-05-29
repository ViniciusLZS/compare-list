import { useEffect, useState } from 'react';

import { useParams, Link } from 'react-router-dom';

import * as S from './styles';

import ListService from '../../services/ListService';

import BodyList from '../../components/BodyList';
import PageHeader from '../../components/PageHeader';
import ProgressBar from '../../components/ProgressBar';
import Button from '../../components/Button';
import ProductService from '../../services/ProductService';
import ProductModal from '../../components/Modal/ProductModal';

export default function List() {
  const [view, setView] = useState('flex');
  const [orderBy, setOrderBy] = useState('asc');
  const [products, setProducts] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState({});
  const [modal, setModal] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
    async function loadeProducts() {
      try {
        setIsLoading(true);

        const listProducts = await ProductService.listProducts({ id, token, orderBy });

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

    async function loadeList() {
      try {
        const allList = await ListService.getList({ id, token });

        setList(allList);
      } catch (error) {
        console.log('error', error);
      }
    }
    loadeList();
  }, [id, orderBy]);

  function handleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
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
        <ProductModal />
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
