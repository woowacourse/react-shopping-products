import type { Meta, StoryObj } from "@storybook/react";
import ProductItemListSection from "./ProductItemSection";

const meta = {
  title: "Components/ProductItemListSection",
  component: ProductItemListSection,
  tags: ["autodocs"],
  args: { onError: () => {} },
} satisfies Meta<typeof ProductItemListSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
