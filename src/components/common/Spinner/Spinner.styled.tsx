import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const orbitSpin = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

export const OrbitSpinnerContainer = styled.div<{ scale: number }>`
  position: relative;
  width: 50px;
  height: 50px;
  // Apply scale transformation
  transform: scale(${(props) => props.scale});
`;

export const Planet = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40%;
  height: 40%;
  background-color: #000000;
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;

export const Orbit = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px solid #000000;
  animation: ${orbitSpin} 2s linear infinite;
  width: 100%;
  height: 100%;
`;

export const Satellite = styled.div`
  position: absolute;
  width: 22%;
  height: 22%;
  background-color: #000000;
  border-radius: 50%;
`;

export const Satellite1 = styled(Satellite)`
  top: 25%;
  right: -10%;
`;

export const Satellite2 = styled(Satellite)`
  bottom: 25%;
  left: -10%;
`;
