import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 50rem;
  margin-top: 2rem;
  position: relative;

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

  .dropdown{
    max-width: 50rem;
    max-height: 30rem;

    position: absolute;
    z-index: 1001;
    overflow-y: scroll;

    display: block;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: white;
    margin-top: 0.5rem;
    border-radius: 4px 4px 8px 8px;

    button {
      margin: 0;
      background-color: transparent;
      border: none;
      padding: 0.2rem;
      text-align: center;
    }

    .spinner {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
