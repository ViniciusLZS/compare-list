import styled from 'styled-components';

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3.5px);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 45rem;
  max-height: 60rem;
  overflow-y: scroll;

  background: ${({ theme }) => theme.colors.primary.lighter};
  border-radius: 2rem;
  padding: 2.4rem;
  margin: 0 2rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  position: relative;

  > h1 {
    margin-top: 4rem;
    font-size: 2.2rem;
    color: ${({ theme, danger }: {theme: any; danger: boolean;}) => (danger ? theme.colors.danger.main : theme.colors.gray[900])}
  }

  .modal-body {
    margin-top: 3.2rem;
  }

  .img {
    width: 100%;
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-width: 8rem;
      max-height: 8rem;
    }
  }

  @media(min-width: 700px) {
    max-height: none;
    overflow-y: hidden;
  }
`;

export const Close = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.primary.main};
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Footer = styled.footer`
  margin-top: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .cancel-button {
    background: transparent;
    border: none;
    font-size: 1.6rem;
    margin-right: 4rem;
    color: ${({ theme }) => theme.colors.gray[200]};

    &[disabled] {
      cursor: not-allowed;
    }
  }
`;
