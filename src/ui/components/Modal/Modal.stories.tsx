import Modal from './Modal';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from "./components/Button";
import { useState } from 'react';
import { sizeStyles } from './Modal.styles';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    position: {
      control: 'select',
      options: ['center', 'bottom'],
    },
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    title: {
      control: 'text',
    },
    children: {
      control: 'text',
      name: 'content',
    },
    onClose: { action: 'onClose' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Center: Story = {
  args: {
    position: 'center',
    title: '기본 모달',
    children: '모달 내용입니다.',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button onClick={() => setIsOpen(true)}>모달 열기</button>
        {isOpen && (
          <Modal
            {...args}
            onClose={() => {
              action('onClose')();
              setIsOpen(false);
            }}
          />
        )}
      </>
    );
  },
};

export const Bottom: Story = {
  args: {
    position: 'bottom',
    title: '하단 모달',
    height: '206px',
    children: '하단 모달 내용입니다.',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button onClick={() => setIsOpen(true)}>하단 모달 열기</button>
        {isOpen && (
          <Modal
            {...args}
            onClose={() => {
              action('onClose')();
              setIsOpen(false);
            }}
          />
        )}
      </>
    );
  },
};

export const Small: Story = {
  args: {
    position: 'center',
    width: sizeStyles.sm.width,
    height: sizeStyles.sm.height,
    children: (
      <div>
        <h2>작은 모달 (sm)</h2>
        <p>작은 사이즈 모달</p>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          marginTop: '20px'
        }}>
          <Button
            onClick={() => action('onCancel')()}
            variant="confirm">확인
          </Button>
        </div>
      </div>
    ),
  },
};

export const Medium: Story = {
  args: {
    position: 'center',
    width: sizeStyles.md.width,
    height: sizeStyles.md.height,
    children: (
      <div>
        <h2>중간 모달 (md)</h2>
        <p>중간 사이즈 모달</p>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          marginTop: '20px'
        }}>
          <Button
            onClick={() => action('onCancel')()}
            variant="cancel">
            취소
          </Button>
          <Button
            onClick={() => action('onCancel')()}
            variant="confirm">
            확인
          </Button>
        </div>
      </div>
    ),
  },
};

export const Large: Story = {
  args: {
    position: 'center',
    width: sizeStyles.lg.width,
    height: sizeStyles.lg.height,
    children: (
      <div>
        <h2>큰 모달 (lg)</h2>
        <p>큰 사이즈 모달</p>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          marginTop: '20px'
        }}>
          <Button
            onClick={() => action('onCancel')()}
            variant="cancel">
            취소
          </Button>
          <Button
            onClick={() => action('onCancel')()}
            variant="confirm">
            확인
          </Button>
        </div>
      </div>
    ),
  },
};
