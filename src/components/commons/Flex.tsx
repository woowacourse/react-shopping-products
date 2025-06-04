import styled from '@emotion/styled';

type FlexProps = {
  children: React.ReactNode;
  flexDirection?: 'row' | 'column';
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  gap?: string;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
};

const Flex = ({
  children,
  flexDirection,
  justifyContent,
  gap,
  width,
  height,
  style,
}: FlexProps) => {
  return (
    <FlexContainer
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      width={width}
      height={height}
      gap={gap}
      style={style}
    >
      {children}
    </FlexContainer>
  );
};

export default Flex;

type FlexContainerProps = {
  flexDirection?: 'row' | 'column';
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  gap?: string;
  width?: string;
  height?: string;
};

const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};

  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  gap: ${({ gap }) => gap || '0'};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
`;
