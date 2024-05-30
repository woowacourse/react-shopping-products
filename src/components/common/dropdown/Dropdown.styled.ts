import styled from '@emotion/styled';

interface SelectProps {
  $isOpen: boolean;
}

interface OptionProps {
  $isOpen: boolean;
  $count: number;
}

interface SelectedTextProps {
  $value: string;
}

export const SelectBox = styled.div<SelectProps>`
  width: 100%;
  position: relative;

  padding: 12px 8px;
  border-radius: 8px;
  align-self: center;
  border: 1px solid ${(props) => (props.$isOpen ? 'black' : '#acacac')};

  background-color: #ffffff;

  cursor: pointer;
`;

export const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  user-select: none;
`;

export const SelectedText = styled.span<SelectedTextProps>`
  margin-left: 4px;

  text-align: center;
  font-size: 14px;
  user-select: none;
  cursor: pointer;
`;

export const SelectOptions = styled.ul<OptionProps>`
  position: absolute;
  top: 45px;
  left: 0;
  width: 100%;
  height: ${(props) => (props.$isOpen ? `${38 * props.$count}px` : '0')};

  border: 1px solid ${(props) => (props.$isOpen ? '#acacac' : 'none')};
  border-radius: 8px;

  background-color: white;

  list-style: none;
  overflow: hidden;

  color: black;

  transition: height 0.3s;
  user-select: none;
`;

export const Option = styled.li`
  padding: 12px;

  color: #4f4f4f;
  font-size: 14px;

  transition: background-color 0.1s ease-in;
  &:hover {
    background-color: rgba(200, 200, 200, 0.4);
  }
`;
