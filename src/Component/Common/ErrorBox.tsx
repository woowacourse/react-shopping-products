import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

export default function ErrorBox({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <StyledDiv>
      <StyledSpan>{children}</StyledSpan>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: #ffc9c9;
`;

const StyledSpan = styled.span`
  font-weight: 500;
  font-size: 12px;
  color: #0a0d13;
`;
