import styled from '@emotion/styled';

export const Dropdown = styled.div<{ $isOpen: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;

  border: 1px solid
    ${(props) => (props.$isOpen ? props.theme.color.darkBlack : props.theme.color.borderGray)};
  border-radius: 8px;

  ${(props) => props.theme.typography.option};
  color: ${(props) => props.theme.color.darkBlack};

  &:hover {
    border: 1px solid ${(props) => props.theme.color.darkBlack};
  }
  cursor: pointer;
`;

export const Select = styled.div`
  display: flex;
  justify-content: space-between;

  width: 7.8125rem;
  height: 2.25rem;
  padding: 0.5rem;
`;

export const ArrowImage = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;

export const Options = styled.ul`
  position: absolute;

  width: 100%;
  margin-top: 2.5rem;
  border: 1px solid ${(props) => props.theme.color.borderGray};
  border-radius: 8px;

  background-color: ${(props) => props.theme.color.white};
`;

export const Option = styled.li`
  height: 2.25rem;
  padding: 0.5rem;

  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.borderGray};
  }
`;
