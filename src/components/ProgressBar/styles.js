import styled from 'styled-components';

export const ContainerBar = styled.div`
  width: 100%;
  max-height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

export const Bar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 45rem;
  height: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: 4rem;

  .progress {
    background: ${({ theme }) => theme.colors.primary.main};
    border-radius: 4rem;
    width: ${({ percentege }) => `${percentege}%`};
    height: 1.5rem;
    padding-left: 4rem;

    display: flex;
    justify-content: end;

    span {
      font-size: 1.2rem;
      padding-right: 0.2rem;
    }
  }
`;

export const ContainerSpan = styled.div`
  display: flex;
  width: 100%;
  max-width: 45rem;
  height: 2rem;
  justify-content: flex-end;
  align-items: end;

  span{
    font-size: 1.2rem;
  }
`;
