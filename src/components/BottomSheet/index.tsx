import useKeyDown from "@/hooks/useKeyDown";
import * as S from "./BottomSheet.styled";
import { ReactNode } from "react";
import useClickOutsideRef from "@/hooks/useClickOutsideRef";

interface BottomSheetProps {
  title: string;
  onRequestClose: () => void;
  children: ReactNode;
}

function BottomSheet({ title, onRequestClose, children }: BottomSheetProps) {
  useKeyDown({ keys: ["Escape"], callback: onRequestClose });
  const ref = useClickOutsideRef<HTMLDivElement>(onRequestClose);

  return (
    <S.Backdrop>
      <S.Modal role="dialog" aria-modal ref={ref}>
        <S.Header>{title}</S.Header>
        {children}
        <S.CloseButton type="button" onClick={onRequestClose}>
          닫기
        </S.CloseButton>
      </S.Modal>
    </S.Backdrop>
  );
}

export default BottomSheet;
