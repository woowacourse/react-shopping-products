import Styled from "@emotion/styled";

export const AppContainer = Styled.div`
  background-color: #D7E8CD;
  display:flex;
  justify-content:center;
`;

export const Wrap = Styled.div`
  width:430px;
  height:100vh;
  background: white;
  position: relative;
`;

export const MiddleContainer = Styled.div`
  height:calc(100vh - 64px);
  overflow-y: scroll;
`;
