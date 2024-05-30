import type { Meta, StoryObj } from "@storybook/react";
import Product from "./Product";

const meta = {
  title: "Page/Product",
  component: Product,
  tags: ["autodocs"],
  args: {
    onError: () => {},
  },
} satisfies Meta<typeof Product>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
