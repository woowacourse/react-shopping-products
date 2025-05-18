import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const pulse = keyframes`
  0% { background-color: #f0f0f0; }
  50% { background-color: #e0e0e0; }
  100% { background-color: #f0f0f0; }
`;

export const SkeletonBox = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

export const NavbarSkeleton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

export const LogoSkeleton = styled(SkeletonBox)`
  width: 80px;
  height: 24px;
`;

export const CartSkeleton = styled(SkeletonBox)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export const SkeletonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 2rem;
`;
