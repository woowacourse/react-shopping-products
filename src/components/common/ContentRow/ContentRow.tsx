import * as S from './ContentRow.style';

interface ContentRowProps {
  title: string;
  content: string;
}

function ContentRow({ title, content }: ContentRowProps) {
  return (
    <S.ContentRow>
      <S.Title>{title}</S.Title>
      <S.Content>{content}</S.Content>
    </S.ContentRow>
  );
}

export default ContentRow;
