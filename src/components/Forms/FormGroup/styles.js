import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 50rem;

  & + & {
    margin-top: 2rem;
  }

  small {
    color: ${({ theme }) => theme.colors.danger.main};
    font-size: 1.2rem;
    display: block;
    margin-top: 8px;
  }

  .form-item {
    position: relative;

    .loader {
      position: absolute;
      top: 18px;
      right: 16px;
    }
  }

  @media(min-width: 700px){
    small {
    font-size: 1.4rem;
  }
  }
`;
