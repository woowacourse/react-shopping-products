import { css } from "@emotion/react";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1
        css={css`
          color: green;
        `}
      >
        React Shopping Products
      </h1>
    </>
  );
}

export default App;
