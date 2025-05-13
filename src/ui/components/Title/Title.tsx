import { Container, TitleText } from './Title.styles';

interface TitleProps {
  title: string;
}

function Title({ title }: TitleProps) {
  return (
    <Container>
      <TitleText>{title}</TitleText>
    </Container>
  );
}

export default Title;
