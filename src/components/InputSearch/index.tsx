import * as S from './styles';

interface InputSearchProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function InputSearch({
  value,
  onChange,
  placeholder = 'Pesquise aqui!',
}: InputSearchProps) {
  return (
    <S.Container>
      <S.Input
        type="text"
        value={value}
        onChange={(event) => onChange(event)}
        placeholder={placeholder}
      />
    </S.Container>
  );
}
