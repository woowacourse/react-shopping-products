import styled from "styled-components";

export const ErrorWrapper = styled.div`
  position: relative;
  height: 100%;
`;

export const ErrorContentContainer = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -50%);

  & > * {
    text-align: center;
  }
`;

export const ErrorImage = styled.img`
  width: 200px;
  height: 200x;
  margin-bottom: ${({ theme }) => theme.spacer.spacing4};
`;

export const ErrorHeading = styled.div`
  font-weight: 600;
`;

export const ErrorBodyText = styled.div`
  margin-bottom: ${({ theme }) => theme.spacer.spacing2};
`;

export const ErrorResetButton = styled.button`
  margin-top: ${({ theme }) => theme.spacer.spacing3};
  width: 250px;
`;
