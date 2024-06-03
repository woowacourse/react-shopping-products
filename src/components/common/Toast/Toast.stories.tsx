import type { Meta, StoryObj } from "@storybook/react";
import Toast from "./Toast";

const meta = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    message: "Hello World",
  },
};
