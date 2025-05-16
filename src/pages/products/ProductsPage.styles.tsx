import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 36px 24px;
  display: flex;
  height: calc(100% - 64px);
  flex-direction: column;
  gap: 28px;
`;

export const SelectBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 132px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 20px;
  justify-items: center;
  overflow-y: scroll;
`;
