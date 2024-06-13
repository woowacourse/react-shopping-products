import * as Styled from './Spinner.styled';

const Spinner = ({ size }: { size?: number }) => {
  return <Styled.SpinnerContainer $size={size} />;
};

export default Spinner;
