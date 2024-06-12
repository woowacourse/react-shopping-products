import styled from 'styled-components';

export const Dropdown = styled.div`
  position: relative;
`;

export const Preview = styled.div<{ isOpened: boolean }>`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border: 1px solid lightGray;
  border-radius: 8px;
  height: 36px;
  width: 124px;
  padding: 8px 12px;
  border: ${(props) =>
    props.isOpened ? 'solid 1px #000000' : 'solid 1px #e5e5e5'};
`;

export const PreviewText = styled.p`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
`;
