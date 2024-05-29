import type { Meta, StoryObj } from "@storybook/react";
import ProductItemTitle from "./ProductItemTitle";

const meta = {
  title: "Components/ProductItemTitle",
  component: ProductItemTitle,
  tags: ["autodocs"],
} satisfies Meta<typeof ProductItemTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
