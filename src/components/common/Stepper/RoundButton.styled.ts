import styled from 'styled-components';

const buttonCSS = ($isActive?: boolean) => {
  const css = $isActive ? activeButtonCSS : passiveButtonCSS;

  return `
  display: flex;
  box-sizing: border-box;

  align-items: center;
  justify-content: center;

  background: #ffffff;
  border: 1px solid #0000001a;

  border-radius: 8px;
  ${css}
`;
};

const activeButtonCSS = `
cursor:pointer;
:hover{
  opacity:0.8;
}
`;
const passiveButtonCSS = `
opacity:0.6;
`;
export const RoundButton = styled.button<{
  width: number;
  height: number;
  $isActive?: boolean;
}>`
  
  width:${({ width }) => `${width}px;`}
  height:${({ height }) => `${height}px;`}

  ${({ $isActive }) => buttonCSS($isActive)}
  `;

export default { RoundButton };
