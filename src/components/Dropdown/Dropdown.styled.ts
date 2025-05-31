import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const dropdownEffect = keyframes`
  from {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }`;

export const Container = styled.div`
  border-radius: 4px;
  border: 1px solid #acacac;
  background-color: #fff;
  position: relative;
  width: 100%;
`;

export const DropdownTrigger = styled.button`
  width: 100%;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
  font-size: 14px;
  gap: 8px;
`;

export const OptionList = styled.ul`
  animation: ${dropdownEffect} 0.3s ease-in-out;
  border: 1px solid #acacac;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  max-height: 15.4rem;
  overflow-y: auto;
  margin-bottom: 48px;
  position: absolute;
  top: 40px;
  left: 0%;
  width: 100%;
  z-index: 1500;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

export const OptionItem = styled.li`
  color: #4f4f4f;
  border-radius: 4px 4px 0 0;
  cursor: pointer;
  border-bottom: 1px solid #acacac;

  &:hover {
    background-color: #f0f0f0;
    transition: background-color 0.25s ease-in-out;
  }

  &:last-child {
    border: none;
  }
`;

export const OptionItemButton = styled.button`
  font-size: 14px;
  width: 100%;
  padding: 8px;
  text-align: left;
`;
