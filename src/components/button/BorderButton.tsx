import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';

interface Props {
  onClick: () => void;
}

const BorderButton = ({
  children,
  onClick,
}: React.PropsWithChildren<Props>) => {
  return <S.Button onClick={onClick}>{children}</S.Button>;
};

export default BorderButton;

const S = {
  Button: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: 30px;
    padding: 6px 8px;
    border-radius: 8px;
    border: 1px solid ${theme.color.blackWithOpacity};
    background-color: ${theme.color.white};
    font-size: ${theme.fontSize.small};
    cursor: pointer;
  `,
};
