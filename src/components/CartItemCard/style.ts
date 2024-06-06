import styled from "styled-components";

export const ItemWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 8px 0 24px;
  border-top: 1px solid ${({ theme }) => theme.COLOR["grey2"]};
`;

export const Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
`;

export const ItemInfoWrapper = styled.div`
  padding: 2px 0px 0px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const RemoveButton = styled.button`
  width: 40px;
  height: 24px;
  border: 1px solid ${({ theme }) => theme.COLOR["grey2"]};
  border-radius: 4px;

  cursor: pointer;
`;

export const ItemInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 80px;
`;
