import styled, { css, keyframes } from 'styled-components';

interface ContainerVariants {
  [key: string]: ReturnType<typeof css>;
}

const messageIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(200px);
  }

  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

const messageOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0px);
  }
  to {
    opacity: 0;
    transform: translateX(100px);
  }
`;

const containerVariants: ContainerVariants = {
  default: css`
    background: ${({ theme }) => theme.colors.primary.main};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.success.main};
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger.main};
  `,
};

interface ContainerProps {
  isLeaving: boolean;
  type: string;
}

export const Container = styled.div<ContainerProps>`
  padding: 16px 32px;
  color: #FFFFFF;
  border-radius: 4px;
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  animation: ${messageIn} 0.3s;
  ${({ isLeaving }) => isLeaving && css` animation: ${messageOut} 0.3s; `}

  ${({ type }) => containerVariants[type] || containerVariants.default};

  & + & {
    margin-top: 12px;
  }

  img {
    margin-right: 8px;
  }
`;
