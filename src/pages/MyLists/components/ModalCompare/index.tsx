import { useNavigate } from 'react-router-dom';
import * as S from './styles';

import formatDate from '../../../../utils/formatDate';

import Close from '../../../../assets/image/icons/close.svg';
import Compare from '../../../../assets/image/icons/myList/compare.svg';
import Check from '../../../../assets/image/icons/myList/check.svg';

interface ListProps {
  id: string;
  name: string;
  estimated: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: string;
}

interface ModalCompareProps {
  listCompate: ListProps[];
  isVisible: boolean;
  onCloseModal: () => void;
}

export default function ModalCompare({
  listCompate,
  isVisible,
  onCloseModal,
}: ModalCompareProps) {
  const navigate = useNavigate();

  const handlePageCompare = () => {
    navigate(`/compare/${listCompate[0]?.id}/${listCompate[1]?.id}`);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <S.Container>
      <button className="close" type="button" onClick={onCloseModal}>
        <img src={Close} alt="fechar" />
      </button>
      <S.Content>
        <h1>Comparar</h1>
        <S.Info>
          <div>
            <span>{listCompate[0]?.name}</span>
            <span>{formatDate(listCompate[0]?.createdAt)}</span>
          </div>
          <img src={Compare} alt="fechar" />
          <div>
            <span>{listCompate[1]?.name ? listCompate[1]?.name : 'Selecione outra lista.' }</span>
            {listCompate[1] && <span>{formatDate(listCompate[1]?.createdAt)}</span>}
          </div>
        </S.Info>

        {listCompate.length === 2
        && (
        <button
          type="button"
          onClick={handlePageCompare}
        >
          <img src={Check} alt="Verificação" />
        </button>
        )}
      </S.Content>
    </S.Container>
  );
}
