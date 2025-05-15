import Styled from '@emotion/styled';

export const CartButton = Styled.button<{ keyWord: 'add' | 'remove' }>`
  width:59px;
  height:24px;
  border-radius:4px;
  font-size:12px;
  font-weight:600;
  background-color: ${(props) => (props.keyWord === 'add' ? 'black' : '#eaeaea')};
  color: ${(props) => (props.keyWord === 'add' ? 'white' : 'black')};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;
