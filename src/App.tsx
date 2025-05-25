import { useState } from "react";
import Modal from "./Component/Common/Modal/Modal";
import Body from "./Component/Layout/Body/Body";
import Header from "./Component/Layout/Header/Header";
import ProductListContainer from "./Component/Product/ProductListContainer/ProductListContainer";
import { APIProvider } from "./domain/contexts/APIContext";

function App() {
  return (
    <APIProvider>
      <AppContent />
    </APIProvider>
  );
}

export default App;

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div>
        <Header onOpenModal={() => setIsModalOpen(true)} />
        <Body>
          <ProductListContainer />
        </Body>
      </div>
      {/* <Modal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
    </>
  );
}
