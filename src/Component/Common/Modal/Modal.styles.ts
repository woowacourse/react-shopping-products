import styled from "@emotion/styled";

export const StyledModalBackground = styled.div<{
  isModalOpen: boolean;
}>`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
visibility: hidden;
visibility: ${({ isModalOpen }) => isModalOpen === true && "visible"};
opacity: ${({ isModalOpen }) => isModalOpen === true && "1"}
transition: opacity 0.3s ease, visibility 0.3s ease;
margin: 0 auto;
`;

export const StyledModalContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 444px;
  top: 492px;
  left: 0.5px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 24px 16px;
  position: relative;
  gap: 24px;
`;

export const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & h4 {
    font-size: 18px;
    font-weight: 700;
  }
`;

export const StyledModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;

  & button {
    background-color: #333333;
    color: white;
    width: 100%;
    height: 44px;
    border-radius: 5px;
  }
`;

export const StyledModalList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledModalItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;

  span {
    font-weight: bold;
  }
`;
