import {DotWaveWrapper, Dot} from '../styles/DotWaveSpinner';

const DotWaveSpinner = () => {
  return (
    <DotWaveWrapper role="status" aria-label="로딩 중">
      <Dot />
      <Dot />
      <Dot />
      <Dot />
    </DotWaveWrapper>
  );
};

export default DotWaveSpinner;
