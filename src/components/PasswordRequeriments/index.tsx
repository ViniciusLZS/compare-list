import * as S from './styles';

import Check from '../../assets/image/icons/signUp/check.svg';

interface PasswordLevelProps {
  size: boolean;
  number: boolean;
  letter: boolean;
  capitalLetter: boolean;
  special: boolean;
}

interface PasswordRequirementsProps {
  passwordLevel: PasswordLevelProps | undefined;
}

export default function PasswordRequirements({ passwordLevel }: PasswordRequirementsProps) {
  return (
    <S.Container>
      <div>
        <span>Mínimo 8 dígitos</span>
        {passwordLevel?.size
          && <img src={Check} alt="check" />}
      </div>

      <div>
        <span>Número</span>
        {passwordLevel?.number && <img src={Check} alt="check" />}
      </div>

      <div>
        <span>Letra</span>
        {passwordLevel?.letter && <img src={Check} alt="check" />}
      </div>

      <div>
        <span>Letra maiúscula</span>
        {passwordLevel?.capitalLetter && <img src={Check} alt="check" />}
      </div>

      <div>
        <span>Caractere especial (!, @, #, $, % e etc.)</span>
        {passwordLevel?.special && <img src={Check} alt="check" />}
      </div>
    </S.Container>
  );
}
