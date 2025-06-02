import styled from '@emotion/styled';

export const Header = styled.div`
  color: #000000;
  font-size: 24px;
  font-weight: 700;
  padding: 0 24px;
  margin: 36px 0 24px;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 24px;
  margin-bottom: 28px;
`;

export const SelectDropdownWrapper = styled.div`
  display: flex;
  position: relative;
`;

export const DropdownWrapper = styled.div`
  display: flex;
  width: 125px;
  padding: 8px;
  gap: 8px;
  border: 1px solid #acacac;
  border-radius: 6px;
  cursor: pointer;

  &:focus {
    outline: 1px solid black;
  }
`;

export const DropdownTitleWrapper = styled.div`
  width: 80px;
`;

export const DropdownUlWrapper = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  z-index: 10;
  max-height: calc(8 * 43.5px);
  overflow-y: auto;
  list-style: none;
  margin: 0;
`;

type DropdownLiWrapperProps = {
  onClick: () => void;
};

export const DropdownLiWrapper = styled.li<DropdownLiWrapperProps>`
  width: 125px;
  padding: 10px 10px;

  &:hover {
    background: #f4f4f4;
    cursor: pointer;
  }
`;
