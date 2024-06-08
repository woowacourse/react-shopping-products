import type { Meta, StoryObj } from '@storybook/react';
import CartItem from './CartItem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const meta = {
  title: 'Components/CartItem',
  component: CartItem,
  tags: ['autodocs'],
  args: {
    id: 1,
    quantity: 324,
    product: {
      id: 2,
      name: '테스트 상품',
      price: 324000,
      imageUrl: 'https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg',
      category: 'fashion',
    },
  },
} satisfies Meta<typeof CartItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ ...args }) => {
    const queryClient = new QueryClient();

    return (
      <QueryClientProvider client={queryClient}>
        <div style={{ width: '380px' }}>
          <CartItem {...args} />
        </div>
      </QueryClientProvider>
    );
  },
};
