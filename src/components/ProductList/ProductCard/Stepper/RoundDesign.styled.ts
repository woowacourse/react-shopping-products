import styled from 'styled-components';

export const RoundButton = styled.button<{ width: number; height: number }>`
  display: flex;
  box-sizing: border-box;
  
  width:${({ width }) => `${width}px;`}
  height:${({ height }) => `${height}px;`}

  align-items: center;
  justify-content: center;

  background: #ffffff;
  border: 1px solid #0000001a;

  border-radius: 8px;
  opacity: 0px;
`;

export default { RoundButton };
