import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import * as S from './ToastGroup.style';

interface ToastGroupProps {
  children: ReactNode;
}

function ToastGroup({ children }: ToastGroupProps) {
  return createPortal(<S.ToastGruop>{children}</S.ToastGruop>, document.body);
}

export default ToastGroup;
