import ConfirmModal from './ConfirmModal';
import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof ConfirmModal> = {
  title: 'Components/Modal/Confirm',
  component: ConfirmModal,
  argTypes: {
    message: {
      control: 'text',
      description: '확인/취소 메시지(필수)',
    },
    description: {
      control: 'text',
      description: '추가 설명(선택)',
    },
    onCancel: { action: 'onCancel' },
    onConfirm: { action: 'onConfirm' },
  },
  parameters: {
    docs: {
      description: {
        component: '취소와 확인 버튼이 있는 모달 컴포넌트입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

export const Confirm: Story = {
  args: {
    message: '변경 사항을 저장하시겠습니까?',
    height: '157px',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button onClick={() => setIsOpen(true)}>Confirm 열기</button>
        {isOpen && (
          <ConfirmModal
            {...args}
            onCancel={() => { action('onCancel')(); setIsOpen(false); }}
            onConfirm={() => { action('onConfirm')(); setIsOpen(false); }}
          />
        )}
      </>
    );
  },
};
