import { css } from "@emotion/react";

export default function Spinner() {
  return (
    <div css={[spinnerWrapper, orbitSpin]} className="active">
      <div css={orbitSpinner}>
        <div css={planet} />
        <div css={orbit}>
          <div css={[satellite, satellite1]} />
          <div css={[satellite, satellite2]} />
        </div>
      </div>
    </div>
  );
}

const spinnerWrapper = css`
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  display: none;

  &.active {
    display: block;
  }
`;

const orbitSpinner = css`
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const planet = css`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40%;
  height: 40%;
  background-color: white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;

const orbit = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px solid white;
  width: 100%;
  height: 100%;
  animation: orbit-spin 2s linear infinite;
`;

const satellite = css`
  position: absolute;
  width: 22%;
  height: 22%;
  background-color: white;
  border-radius: 50%;
`;

const satellite1 = css`
  top: 25%;
  right: -10%;
`;

const satellite2 = css`
  bottom: 25%;
  left: -10%;
`;

const orbitSpin = css`
  @keyframes orbit-spin {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;
