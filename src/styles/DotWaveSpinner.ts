import styled from "@emotion/styled";

export const DotWaveWrapper = styled.div`
  --uib-size: 50px;
  --uib-speed: 0.6s;
  --uib-color: #0d0909;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: var(--uib-size);
  height: calc(var(--uib-size) * 0.17);
  padding-top: calc(var(--uib-size) * 0.34);
  margin: 40px auto;
`;

export const Dot = styled.div`
  flex-shrink: 0;
  width: calc(var(--uib-size) * 0.17);
  height: calc(var(--uib-size) * 0.17);
  border-radius: 50%;
  background-color: var(--uib-color);
  will-change: transform;

  &:nth-of-type(1) {
    animation: jump824 var(--uib-speed) ease-in-out
      calc(var(--uib-speed) * -0.45) infinite;
  }
  &:nth-of-type(2) {
    animation: jump824 var(--uib-speed) ease-in-out
      calc(var(--uib-speed) * -0.3) infinite;
  }
  &:nth-of-type(3) {
    animation: jump824 var(--uib-speed) ease-in-out
      calc(var(--uib-speed) * -0.15) infinite;
  }
  &:nth-of-type(4) {
    animation: jump824 var(--uib-speed) ease-in-out infinite;
  }

  @keyframes jump824 {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-200%);
    }
  }
`;
