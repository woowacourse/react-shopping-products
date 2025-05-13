import { ReactNode } from "react";
import * as S from "./MobileLayout.styled";

interface MobileLayoutProps {
  children: ReactNode;
}

function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <S.Container>
      <S.SidePanel>
        <S.SidePanelText>메이토</S.SidePanelText>
      </S.SidePanel>
      <S.Content>{children}</S.Content>
      <S.SidePanel>
        <S.SidePanelText>써밋</S.SidePanelText>
      </S.SidePanel>
    </S.Container>
  );
}

export default MobileLayout;
