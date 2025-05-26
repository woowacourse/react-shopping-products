import ModalContainer from './ModalContainer';
import ModalContent from './ModalContent';
import ModalBody from './ModalBody';
import ModalOverlay from './ModalOverlay';
import ModalTitle from './ModalTitle';
import CancelButton from './CancelButton';
import { ModalProvider } from './ModalProvider';
import Trigger from './Trigger';

export const Modal = Object.assign(ModalProvider, {
  Container: ModalContainer,
  Overlay: ModalOverlay,
  Content: ModalContent,
  Body: ModalBody,
  Title: ModalTitle,
  CancelButton: CancelButton,
  Trigger: Trigger,
});
