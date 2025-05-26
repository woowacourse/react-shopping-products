import styled from "@emotion/styled";

export const SelectBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 27px;
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: 24px;
  margin: 0px;
`;

export const Label = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const FirstSelectWrapper = styled.div`
  display: flex;
`;
