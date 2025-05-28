import { css } from "@emotion/css";
import ProductListPage from "./pages/ProductListPage";
import { useState } from "react";
import { APIProvider } from "./contexts/API/APIProvider";
import { ErrorProvider } from "./contexts/Error/ErrorProvider";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <APIProvider>
      <ErrorProvider>
        <div className={AppStyles}>
          <ProductListPage isOpen={isOpen} handleModal={handleModal} />
        </div>
      </ErrorProvider>
    </APIProvider>
  );
}

export default App;

const AppStyles = css`
  display: flex;
  min-height: 100dvh;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
`;
