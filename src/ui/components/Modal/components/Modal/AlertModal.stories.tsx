import AlertModal from './AlertModal';
import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof AlertModal> = {
  title: 'Components/Modal/Alert',
  component: AlertModal,
  argTypes: {
    message: {
      control: 'text',
      description: '경고 메시지(필수)',
    },
    description: {
      control: 'text',
      description: '추가 설명(선택)',
    },
    onConfirm: {action: 'onConfirm'},
  },
  parameters: {
    docs: {
      description: {
        component: '단일 확인 버튼이 있는 경고용 모달 컴포넌트입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AlertModal>;

export const Alert: Story = {
  args: {
    message: '정말 삭제하시겠습니까?',
    height: '157px',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button onClick={() => setIsOpen(true)}>
          Alert 열기
        </button>
        {isOpen && (
          <AlertModal
            {...args}
            onConfirm={() => {
              action('onConfirm')();
              setIsOpen(false);
            }}
          />
        )}
      </>
    );
  },
};
