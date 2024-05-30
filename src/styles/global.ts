import resetStyle from "@/styles/reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
${resetStyle};

#root {
    margin: 0 auto;
    padding-top:64px;
}

::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 768px) {
      #root {
          width: 100%;
      }
  }
  
  @media (min-width: 768px) {
      #root {
          width: 429px;
      }
  }
`;

export default GlobalStyles;
