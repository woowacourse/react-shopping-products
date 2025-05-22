import styled from '@emotion/styled';
import Flex from './Flex';
import { createPortal } from 'react-dom';

type MessageType = 'error' | 'info';

interface ToastMeesageProps {
  message: string;
  type: MessageType;
}

function ToastMessage({ message, type }: ToastMeesageProps) {
  return createPortal(
    <Container type={type}>
      <ErrorText>{message}</ErrorText>
    </Container>,
    document.body
  );
}

export function showToastMessage(type: MessageType, message: string) {
  createPortal(<ToastMessage type={type} message={message} />, document.body);
}

const MESSAGE_TYPE_COLOR_MAP: Record<MessageType, string> = {
  error: '#FFC9C9',
  info: '#ffffff',
};

const Container = styled(Flex)<{ type: MessageType }>`
  width: 1000px;
  height: 40px;
  position: fixed;
  top: 0;
  background-color: ${({ type }) => MESSAGE_TYPE_COLOR_MAP[type]};
`;

const ErrorText = styled.p`
  font-size: 16px;
`;
export default ToastMessage;
