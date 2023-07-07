import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity:1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }

  to { opacity: 0; }
`;

const scaleIn = keyframes`
  from { transform: scale(0); }

  to { transform: scale(1); }
`;

const scaleOut = keyframes`
  from { transform: scale(1); }

  to { transform: scale(0); }
`;

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

  overflow-y: scroll;

  animation: ${fadeIn} 0.3s;
  ${({ isLeaving }: {isLeaving: boolean}) => isLeaving && css` animation: ${fadeOut} 0.3s; `}
`;

interface ConatinerProps {
  isLeaving: boolean;
  danger: boolean;
}
export const Container = styled.div<ConatinerProps>`
  width: 100%;
  max-width: 45rem;
  max-height: 65rem;

  background: ${({ theme }) => theme.colors.primary.lighter};
  border-radius: 2rem;

  margin: 0 2rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  position: relative;

  animation: ${scaleIn} 0.3s;
  ${({ isLeaving }: {isLeaving: boolean}) => isLeaving && css` animation: ${scaleOut} 0.3s; `}

  > h1 {
    padding-left: 1rem;
    margin-top: 4rem;
    font-size: 2.2rem;
    color: ${({ theme, danger }) => (danger ? theme.colors.danger.main : theme.colors.gray[900])}
  }

  @media(min-width: 700px) {
    max-height: 65rem;

    > h1 {
      padding-left: 2rem;
    }
  }
`;

interface ContentProps {
  theme: any;
}
export const Content = styled.div<ContentProps>`
  width: 100%;
  max-width: 45rem;
  max-height: 53rem;
  overflow-y: scroll;

  background: ${({ theme }) => theme.colors.primary.lighter};
  border-radius: 2rem;
  padding: 1rem;


  .modal-body {
    margin-bottom: 4rem;
    .positionButton {
      position: absolute;
      bottom: -2rem;
    }
  }

  .img {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-width: 8rem;
      max-height: 8rem;
    }
  }

  @media(min-width: 700px) {
    max-height: 60rem;
    padding: 2rem;

    &::-webkit-scrollbar{
        height: 5px;
        width: 1rem;
      }
    &::-webkit-scrollbar-thumb{
      background: ${({ theme }) => theme.colors.gray[200]};
    }
  }
`;

export const Close = styled.button`
  position: absolute;
  top: -1rem;
  right: -1rem;
  background: ${({ theme }) => theme.colors.primary.lighter};
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
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
