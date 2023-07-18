import styled, { css, keyframes } from 'styled-components';

const dropdownIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(200px);
  }

  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

const dropdownOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0px);
  }
  to {
    opacity: 0;
    transform: translateX(100px);
  }
`;

export const Container = styled.div`
  .menu {
    border: none;
    background: transparent;
    position: relative;
  }
`;

export const Dropdown = styled.div`
  max-width: 30rem;
  max-height: 50rem;
  width: 20rem;
  z-index: 100;

  animation: ${dropdownIn} 0.3s;
  ${({ isLeaving }: {isLeaving: boolean}) => isLeaving && css` animation: ${dropdownOut} 0.3s forwards;`}

  position: absolute;
  right: 2rem;
  background: rgba(173,177,244, 0.3);
  backdrop-filter: blur(3px);
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: 1rem;

  ul {
    list-style: none;
    padding: 2rem;

    li {
      border-radius: 0.7rem;

      &.active {
        background: linear-gradient(to right, ${({ theme }) => theme.colors.primary.lighter}, ${({ theme }) => theme.colors.primary.dark});
        color: white;
      }

      &:hover {
        background: linear-gradient(to right, ${({ theme }) => theme.colors.primary.lighter}, ${({ theme }) => theme.colors.primary.dark});
        color: white;
      }
    }

    li + li {
      margin-top: 2rem;
    }

    a {
      font-size: 1.6rem;
      text-decoration: none;
      color: ${({ theme }) => theme.colors.default.black};

      display: flex;
      align-items: center;
      gap: 1rem;
    }

    button {
      width: 100%;
      font-size: 1.6rem;
      border: none;
      background: transparent;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    img {
      max-width: 2.5rem;
      max-height: 2.5rem;
    }
  }
`;
