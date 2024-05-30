import styled from 'styled-components';

export const Layout = styled.div`
  position: relative;
`;

export const Container = styled.div<{ $isDefault: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 125px;
  height: 36px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.primary.light};
  font-size: ${({ theme }) => theme.fontSize.base};
  cursor: pointer;

  p {
    color: ${(props) =>
      props.$isDefault ? ({ theme }) => theme.color.primary.light : ({ theme }) => theme.color.primary.dark};
  }
`;

export const OptionList = styled.ul`
  z-index: 999;
  position: absolute;
  top: 38px;
  width: 125px;
  border: 1px solid ${({ theme }) => theme.color.primary.light};
  border-radius: 8px;
  background: #ffffff;
  font-size: ${({ theme }) => theme.fontSize.base};
`;

export const OptionItem = styled.li`
  width: 125px;
  height: 32px;
  cursor: pointer;

  &:hover {
    background: #eeeeee;
  }
`;

export const OptionLabel = styled.label`
  display: inline-block;
  width: 125px;
  height: 100%;
  padding: 8px;
`;
