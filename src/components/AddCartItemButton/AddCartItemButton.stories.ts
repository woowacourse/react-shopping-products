import type { Meta, StoryObj } from "@storybook/react";
import AddCartItemButton from "./AddCartItemButton";

const meta = {
  title: "Components/ToggleCartItemButton",
  component: AddCartItemButton,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AddCartItemButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    onClick: () => {},
  },
};
