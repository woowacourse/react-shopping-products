import { useContext } from 'react';
import DropdownContext from './DropdownContext';

const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown 컨텍스트가 외부에서 사용되고 있어요!');
  }
  return context;
};

export default useDropdownContext;
