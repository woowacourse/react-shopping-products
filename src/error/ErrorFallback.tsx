import ErrorImage from "@/assets/error.png";
import Button from "@/components/_common/Button";
import TextBox from "@/components/_common/TextBox";
import * as S from "@/error/ErrorFallback.style";
import { theme } from "@/styles/theme";

export interface ErrorProps {
  message: string;
  resetError: () => void;
}

const ErrorFallback = ({ message, resetError }: ErrorProps) => {
  return (
    <S.ErrorWrapper>
      <S.ErrorImage src={ErrorImage} alt="error" />
      <TextBox text={message} type="large" />
      <Button
        onClick={resetError}
        height={30}
        width={100}
        borderType={"round"}
        disabled={false}
        backgroundColor={theme.COLOR.grey3}
        position="basic"
      >
        새로고침
      </Button>
    </S.ErrorWrapper>
  );
};

export default ErrorFallback;
