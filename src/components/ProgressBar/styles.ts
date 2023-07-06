import styled, { css } from 'styled-components';

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

interface BarProps {
  exceededLimit: boolean;
  percentege: number;
}
export const Bar = styled.div<BarProps>`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 45rem;
  height: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: 4rem;
  margin-top: 2rem;

  .progress {
    background: ${({ theme }) => theme.colors.primary.main};
    border-radius: 4rem;
    width: ${({ percentege }) => `${percentege}%`};
    height: 1.5rem;
    position: relative;

    display: flex;
    justify-content: end;

    span {
      min-width: 6rem;
      position: absolute;
      top:-1.7rem;
      left: ${({ percentege }) => percentege};
      font-size: 1.2rem;
      padding-right: 0.2rem;

      ${({ theme, exceededLimit }) => exceededLimit && css`color: ${theme.colors.danger.dark}`}
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
