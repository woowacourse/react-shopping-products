import type { Meta, StoryObj } from "@storybook/react";
import ProductItem from "./ProductItem";

const meta = {
  title: "Components/ProductItem",
  component: ProductItem,
  tags: ["autodocs"],
  args: {
    product: {
      id: 34,
      name: "코카콜라",
      price: 10000,
      imageUrl:
        "https://godomall.speedycdn.net/1cd80571a779bf8f2c08a18dc0965949/goods/1000000027/image/detail/1000000027_detail_012.jpg",
      category: "beverage",
    },
  },
} satisfies Meta<typeof ProductItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
