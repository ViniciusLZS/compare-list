import PropTypes from 'prop-types';
import { useState } from 'react';

import * as S from './styles';

import openEye from '../../assets/image/icons/openEye.svg';
import closeEye from '../../assets/image/icons/closeEye.svg';

export default function Input({
  label, placeholder, type, value, onChange, error, disabled,
}) {
  const [eye, setEye] = useState(false);

  function handleEye() {
    setEye(
      (prevState) => (prevState === false),
    );
  }
  return (
    <S.Label label={label}>
      <span>{label}</span>
      <S.Input
        onChange={onChange}
        value={value}
        type={eye ? 'text' : type}
        placeholder={placeholder}
        error={error}
        disabled={disabled}
      />
      {type === 'password' && (
        <button className="eye" type="button" onClick={() => handleEye()}>
          {eye
            ? <img src={openEye} alt="Olho para visualizar senha" />
            : <img src={closeEye} alt="Olho para não visualizar senha" />}
        </button>
      )}
    </S.Label>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
};

Input.defaultProps = {
  error: '',
};
