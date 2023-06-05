import { useCallback, useEffect, useState } from 'react';

import { useParams, Link } from 'react-router-dom';

import * as S from './styles';

import ListService from '../../services/ListService';

import BodyList from '../../components/BodyList';
import PageHeader from '../../components/PageHeader';
import ProgressBar from '../../components/ProgressBar';
import Button from '../../components/Button';
import ProductService from '../../services/ProductService';
import ProductModal from '../../components/Modal/ProductModal';

interface ListParams {
  id: string;
}

interface FormData {
  name: string;
  value?: string;
  amount?: string
  measuresId?: string;
  image?: string
}

export default function List() {
  const [view, setView] = useState('flex');
  const [orderBy, setOrderBy] = useState('created_at');
  const [products, setProducts] = useState([]);
  const [list, setList] = useState({ estimated: 0, name: '', id: '' });
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [disabledOrderButton, setDisabledOrderButton] = useState(false);

  useEffect(() => {
    if (submitting || hasError || products.length < 1) {
      setDisabledOrderButton(true);
    } else {
      setDisabledOrderButton(false);
    }
  }, [submitting, hasError, products]);

  const { id } = useParams<ListParams>();

  const token = localStorage.getItem('token') ?? '';

  const loadeProducts = useCallback(async () => {
    try {
      if (token) {
        const allList = await ListService.getList({ id, token });
        setList(allList);
      }
    } catch (error) {
      console.log('error', error);
    }

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
  }, [id, orderBy, token]);

  useEffect(() => {
    loadeProducts();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [loadeProducts, submitting]);

  function handleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'created_at' ? 'name' : 'created_at'),
    );
  }

  function handleView() {
    setView(
      (prevState) => (prevState === 'flex' ? 'grid' : 'flex'),
    );
  }

  function handleModal() {
    setModal((prevState) => !prevState);
  }

  const handleSubmit = async (formData: FormData) => {
    const formDatas = {
      name: formData.name,
      value: formData.value,
      amount: formData.amount,
      measureId: formData.measuresId,
      image: formData.image,
      listId: list.id,
    };
    try {
      setSubmitting(true);
      await ProductService.createProduct({ formDatas, token });
      setSubmitting(false);
      setModal(false);
    } catch (error) {
      console.log('🚀 ~ file: index.tsx:86 ~ handleSubmit ~ error:', error);
    }
  };

  return (
    <>
      {modal && (
        <ProductModal
          modal={modal}
          handleModal={() => handleModal()}
          onHandleSubmit={handleSubmit}
        />
      )}

      <S.Header>
        <ProgressBar list={list} />

        <PageHeader
          onHandleOrderBy={() => handleOrderBy()}
          onHandleView={() => handleView()}
          view={view}
          orderBy={orderBy}
          list={list}
          disabledOrderButton={disabledOrderButton}
          hasError={hasError}
        />
      </S.Header>

      <S.Content>
        <BodyList
          view={view}
          products={products}
          onLoadeProducts={loadeProducts}
          hasError={hasError}
          isLoading={isLoading}
        />

        {!isLoading && (
        <S.ButtonContainer>
          <Link to="/mylists"><Button type="button">Feito!</Button></Link>
          <Button type="button" handleClick={() => handleModal()}>Adicionar</Button>
        </S.ButtonContainer>
        )}
      </S.Content>
    </>
  );
}
