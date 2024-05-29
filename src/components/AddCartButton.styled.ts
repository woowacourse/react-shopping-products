import styled from 'styled-components';

const roundButtonCSS = `
display: flex;
align-items: center;
justify-content: center;

width: 59px;
height: 24px;
padding: 4px 8px;
gap: 4px;
border-radius: 4px;

font-family: Noto Sans;
font-size: 12px;
font-weight: 600;
line-height: 15px;
text-align: left;
`;
export const AddButton = styled.button`
  ${roundButtonCSS}

  background: #000000;
  color: #ffffff;
`;

export const DeleteButton = styled.button`
  ${roundButtonCSS}

  background: #eaeaea;
  color: #000000;
`;
