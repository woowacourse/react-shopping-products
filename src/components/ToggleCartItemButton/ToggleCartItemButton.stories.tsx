import type { Meta, StoryObj } from "@storybook/react";
import ToggleCartItemButton from "./ToggleCartItemButton";

const meta = {
  title: "Components/ToggleCartItemButton",
  component: ToggleCartItemButton,
  tags: ["autodocs"],
  argTypes: { isInCart: { description: "", control: { type: "boolean" } } },
} satisfies Meta<typeof ToggleCartItemButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
