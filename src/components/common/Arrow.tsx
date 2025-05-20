import styled from '@emotion/styled';

interface ArrowProps {
  width: number;
  direction: DirectionType;
}
type DirectionType = 'up' | 'down' | 'left' | 'right';

const ROTATE_MAP: Record<DirectionType, string> = {
  down: '0deg',
  left: '90deg',
  up: '180deg',
  right: '270deg',
};

function Arrow({ width, direction }: ArrowProps) {
  return (
    <Container width={width} direction={direction}>
      <img src="./assets/icons/Arrow.svg" alt="화살표 아이콘" />
    </Container>
  );
}

const Container = styled.div<{ width: number; direction: DirectionType }>`
  width: ${({ width }) => `${width}px`};
  height: ${({ width }) => `${width}px`};
  rotate: ${({ direction }) => ROTATE_MAP[direction]};
`;

export default Arrow;
