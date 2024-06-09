import { ReactNode } from 'react';

import * as S from './ToastGroup.style';
import { createPortal } from 'react-dom';

interface ToastGroupProps {
  children: ReactNode;
}

function ToastGroup({ children }: ToastGroupProps) {
  return createPortal(<S.ToastGruop>{children}</S.ToastGruop>, document.body);
}

export default ToastGroup;
