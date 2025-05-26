import { DotWaveWrapper, Dot } from '../styles/DotWaveSpinner';

const DotWaveSpinner = () => {
  return (
    <DotWaveWrapper role="status" aria-label="로딩 중" data-testid="dot-wave-spinner">
      <Dot />
      <Dot />
      <Dot />
      <Dot />
    </DotWaveWrapper>
  );
};

export default DotWaveSpinner;
