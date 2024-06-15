import styled from 'styled-components';
import { MinusSign, PlusSign } from '../../../assets';
import RoundButton, { RoundButtonProps } from './RoundButton';

const PlusButton = (props: RoundButtonProps) => <RoundButtonWithImg imgSrc={PlusSign} {...props} />;
const MinusButton = (props: RoundButtonProps) => <RoundButtonWithImg imgSrc={MinusSign} {...props} />;

interface DisplayCounterProps {
  count: number;
  $width?: number;
  $height?: number;
}
const DisplayCounter = ({ count, $width = 40, $height = 32 }: DisplayCounterProps) => {
  return (
    <CenteredDiv $width={$width} $height={$height}>
      {count}
    </CenteredDiv>
  );
};

interface RoundButtonWithImgProps extends RoundButtonProps {
  imgSrc: string;
}
const RoundButtonWithImg = (props: RoundButtonWithImgProps) => {
  const buttonProps = { ...props, imgSrc: undefined };
  return (
    <RoundButton {...buttonProps}>
      <CenteredDiv>
        <Image src={props.imgSrc}></Image>
      </CenteredDiv>
    </RoundButton>
  );
};

const StyledLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const CenteredDiv = styled.div<{ $width?: number; $height?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $width }) => `width:${$width}px;`}
  ${({ $height }) => `height:${$height}px;`}
`;
const Image = styled.img`
  width: 14px;
  height: 14px;

  //styleName: label;
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
`;

const Layout = { Horizontal: StyledLayout, Vertical: StyledLayout };
const Stepper = Object.assign(Layout, {
  MinusButton,
  PlusButton,
  DisplayCounter,
});

export default Stepper;
