import styled from '@emotion/styled';

export const ToastContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 100px;

  transform: translate(-50%, -50%);

  padding: 1rem 1.5rem;

  color: #000;
  background: ${(prop) => prop.theme.color.errorPink};

  border-radius: 0.4375rem;

  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;

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

  animation: fadeOut linear 3s forwards;
`;
