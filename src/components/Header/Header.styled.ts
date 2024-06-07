import styled from "styled-components";
import { STYLE_OPTION } from "../../constants";

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: ${STYLE_OPTION.HEADER_Z_INDEX};

  width: inherit;
  height: 64px;
  padding: 0px 24px;
  background: rgba(0, 0, 0, 1);
`;
