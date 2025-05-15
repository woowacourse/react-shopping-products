import * as Styled from "./Spinner.styled";

const Spinner = ({ scale = 1 }: { scale?: number }) => {
  return (
    <Styled.OrbitSpinnerContainer scale={scale}>
      <Styled.Planet />
      <Styled.Orbit>
        <Styled.Satellite1 />
        <Styled.Satellite2 />
      </Styled.Orbit>
    </Styled.OrbitSpinnerContainer>
  );
};

export default Spinner;
