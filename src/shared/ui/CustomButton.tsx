import * as S from './CustomButton.styles';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconUrl: string;
  title: string;
}

export default function CustomButton({ iconUrl, title, ...rest }: CustomButtonProps) {
  return (
    <S.CustomButton {...rest}>
      <S.ButtonIcon src={iconUrl} alt='button icon' />
      <S.ButtonTitle>{title}</S.ButtonTitle>
    </S.CustomButton>
  );
}
