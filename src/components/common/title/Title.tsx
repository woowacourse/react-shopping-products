import * as Styled from './Title.styled';

interface TitleProp {
  title: string;
}

const Title = ({ title }: TitleProp) => {
  return (
    <Styled.TitleContainer>
      <Styled.Title>{title}</Styled.Title>
    </Styled.TitleContainer>
  );
};

export default Title;
