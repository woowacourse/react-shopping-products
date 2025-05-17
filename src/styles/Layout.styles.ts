import styled from "@emotion/styled";

export const LayoutContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
`;

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 430px;
  height: 100%;
  background-color: #fff;
`;

export const Wrapper = styled.div`
  height: 100%;
  background-color: #fff;
  padding: 36px 25px 25px;
  overflow-y: scroll;
  position: relative;
`;

export const ProductControlPanel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;
