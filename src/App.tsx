// import { useState } from "react";
import { css } from "@emotion/css";
import Header from "./components/Header/Header";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <main className={mainStyles}>
      <Header />
    </main>
  );
}

export default App;

const mainStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  background-color: #ffffff;
`;
