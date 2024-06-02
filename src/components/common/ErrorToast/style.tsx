import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }

  25% {
    opacity: 1;
  }

  75% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

export const Container = styled.div`
  display: flex;
  position: fixed;
  bottom: 5%;
  left: 50%;
  width: 80vw;
  height: 4.5rem;

  transform: translateX(-50%);

  animation: ${fadeInOut} 3s ease-in-out;
`;

export const SideBar = styled.div`
  width: 0.5rem;

  border-radius: 0 4px 4px 0;

  transform: translateX(4px);

  background-color: ${(props) => props.theme.color.error};
`;

export const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  gap: 1rem;

  border-radius: 16px;

  padding: 0.75rem;

  background-color: ${(props) => props.theme.color.errorLight};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
`;

export const Title = styled.h2`
  ${(props) => props.theme.typography.toastTitle}
`;
