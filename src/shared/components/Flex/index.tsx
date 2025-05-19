import { StyledFlexBox } from './Flex.styled';
import { Props } from './Flex.types';

export const Flex = ({
  direction,
  justifyContent,
  alignItems,
  gap = '0',
  margin,
  padding,
  width,
  height,
  children,
  ...props
}: Props) => {
  return (
    <StyledFlexBox
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      gap={gap}
      margin={margin}
      padding={padding}
      width={width}
      height={height}
      {...props}
    >
      {children}
    </StyledFlexBox>
  );
};
