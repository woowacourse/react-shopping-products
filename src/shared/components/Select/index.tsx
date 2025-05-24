import { ComponentProps, useState } from 'react';
import { css } from '@emotion/react';

import {
  StyledSelectContainer,
  StyledOption,
  StyledSelectIcon,
  StyledTriggerButton,
  StyledOptionsContainer,
} from './Select.styled';

import { Text } from '../Text';

export type Props = {
  /**
   * The currently selected category to be displayed.
   */
  selectedOptions: string;

  maxWidth?: number | string;
} & ComponentProps<'div'>;

export const Select = ({ selectedOptions, maxWidth = '200px', children, ...props }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <StyledSelectContainer maxWidth={maxWidth} onClick={() => setIsOpen(!isOpen)} {...props}>
      <StyledTriggerButton>
        <Text type="Body">{selectedOptions ?? '전체'}</Text>
        <StyledSelectIcon
          isOpen={isOpen}
          src={'/arrow.png'}
          alt="arrow"
          css={css`
            padding: 2px 0 0 0;
          `}
        />
      </StyledTriggerButton>

      {isOpen && <StyledOptionsContainer>{children}</StyledOptionsContainer>}
    </StyledSelectContainer>
  );
};

export type OptionProps = {
  /**
   * The currently selected category to be displayed.
   */
  option: string;
  /**
   * Callback function when a category is selected.
   */
  onSelectOption: (category: string) => void;
} & ComponentProps<'div'>;

const Option = ({ option, onSelectOption, ...props }: OptionProps) => {
  return (
    <StyledOption onClick={() => onSelectOption(option)} {...props}>
      {option}
    </StyledOption>
  );
};

Select.Option = Option;
