import styled from '@emotion/styled';
import { useModal } from './ModalProvider';

interface TriggerProps {
  children: React.ReactNode;
}

function Trigger({ children }: TriggerProps) {
  const { setOpen } = useModal();
  const handleClick = () => setOpen(true);

  return (
    <StyledButtonWrapper onClick={handleClick}>{children}</StyledButtonWrapper>
  );
}

export default Trigger;

const StyledButtonWrapper = styled.div`
  height: 36px;
  padding: 0px;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
