import styled from '@emotion/styled';

export default function ErrorBox() {
  return (
    <StyledDiv>
      <StyledSpan>오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</StyledSpan>
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
  position: absolute;
  top: 64px;
`;

const StyledSpan = styled.span`
  font-weight: 500;
  font-size: 12px;
  color: #0a0d13;
`;
