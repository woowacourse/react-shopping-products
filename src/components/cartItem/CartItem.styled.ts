import styled from '@emotion/styled';

import { THEME } from '@/constants/theme';

export const itemWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${THEME.LIGHT_BLACK};
  padding: 0.625rem 0;
`;

export const itemBody = styled.div`
  display: flex;
  gap: 1.25rem;
`;

export const image = styled.img`
  border-radius: 0.5rem;
`;

export const itemContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const productName = styled.span`
  font-weight: 700;
  font-size: 1rem;
`;

export const price = styled.span`
  font-weight: 500;
  font-size: 0.75rem;
`;

export const deleteButton = styled.button`
  width: 2.5rem;
  height: 1.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${THEME.LIGHT_BLACK};
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;

  background-color: ${THEME.WHITE};

  font-size: 0.75rem;
`;
