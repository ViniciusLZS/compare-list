import * as S from './styles';

import BodyList from '../../components/BodyList';
import Header from '../../components/Header';
import PageHeader from '../../components/PageHeader';
import ProgressBar from '../../components/ProgressBar';
import Button from '../../components/Button';

export default function List() {
  return (
    <>

      <S.Container>
        <Header />
        <ProgressBar />

        <PageHeader />
      </S.Container>

      <S.Content>
        <BodyList />

        <S.ButtonContainer>
          <Button type="button">Feito!</Button>
          <Button type="button">Adicionar</Button>
        </S.ButtonContainer>
      </S.Content>

    </>
  );
}
