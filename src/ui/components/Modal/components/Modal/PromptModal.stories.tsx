import PromptModal from './PromptModal';
import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof PromptModal> = {
  title: 'Components/Modal/Prompt',
  component: PromptModal,
  argTypes: {
    message: {
      control: 'text',
      description: '프롬프트 메시지(필수)',
    },
    placeholder: {
      control: 'text',
      description: '인풋 플레이스홀더(선택)',
    },
    onCancel: {action: 'onCancel'},
    onConfirm: {action: 'onConfirm'},
  },
  parameters: {
    docs: {
      description: {
        component: '사용자 입력을 받을 수 있는 프롬프트 모달 컴포넌트입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PromptModal>;

export const Prompt: Story = {
  args: {
    message: '이름을 입력해주세요',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button onClick={() => setIsOpen(true)}>Prompt 열기</button>
        {isOpen && (
          <PromptModal
            {...args}
            onCancel={() => {
              action('onCancel')();
              setIsOpen(false);
            }}
            onConfirm={(value) => {
              action('onConfirm')(value);
              setIsOpen(false);
            }}
          />
        )}
      </>
    );
  },
};
