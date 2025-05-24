import Header from "./Component/Layout/Header/Header";
import Body from "./Component/Layout/Body/Body";
import ProductListContainer from "./Component/Product/ProductListContainer/ProductListContainer";
import ErrorBox from "./Component/Common/ErrorBox/ErrorBox";
import useCartContext from "./domain/contexts/useCartContext";
import styled from "@emotion/styled";
import Modal from "./Component/Common/Modal/Modal";
import { useState } from "react";

export default function AppContent() {
  const { errorMessage } = useCartContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div>
        <Header onOpenModal={() => setIsModalOpen(true)} />
        <Body>
          <ProductListContainer />
        </Body>
        {errorMessage.map((msg, index) => (
          <StyledDiv>
            <ErrorBox key={index}>{msg}</ErrorBox>
          </StyledDiv>
        ))}
      </div>
      <Modal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

const StyledDiv = styled.div`
  position: absolute;
  width: 100%;
  top: 64px;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
