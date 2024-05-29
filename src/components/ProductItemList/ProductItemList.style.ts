import styled from "styled-components";

export const Container = styled.div`
  display: grid;

  flex-direction: column;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 16px;
  column-gap: 20px;
  grid-template-rows: auto;
`;
