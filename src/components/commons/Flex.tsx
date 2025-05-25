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
  css?: { [key: string]: string };
};

const Flex = ({
  children,
  flexDirection,
  justifyContent,
  gap,
  width,
  height,
  css,
}: FlexProps) => {
  return (
    <FlexContainer
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      width={width}
      height={height}
      gap={gap}
      css={css}
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
  css?: { [key: string]: string };
};

const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};

  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  gap: ${({ gap }) => gap || '0'};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
  ${({ css }) => css};
`;
