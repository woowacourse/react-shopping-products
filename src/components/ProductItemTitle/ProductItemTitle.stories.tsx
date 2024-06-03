import type { Meta, StoryObj } from "@storybook/react";
import ProductItemTitle from "./ProductItemTitle";

const meta = {
  title: "Components/ProductItemTitle",
  component: ProductItemTitle,
  tags: ["autodocs"],
  args: {
    title: "코카콜라",
    price: 10000,
  },
} satisfies Meta<typeof ProductItemTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
