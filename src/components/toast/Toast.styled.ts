import styled from '@emotion/styled';

export const ToastContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 100px;

  transform: translate(-50%, -50%);

  padding: 1rem 1.5rem;

  color: #000;
  background: ${(prop) => prop.theme.color.errorPink};

  border-radius: 7px;

  opacity: 0.9;

  font-size: 1.1rem;
  font-weight: 500;

  @keyframes fadeOut {
    0%,
    100% {
      opacity: 0;
    }
    10%,
    90% {
      opacity: 1;
    }
  }
  animation: fadeOut 3s ease-in-out 0s infinite normal none running;
`;
