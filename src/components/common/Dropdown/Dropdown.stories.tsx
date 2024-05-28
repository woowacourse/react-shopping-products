import type { Meta, StoryObj } from "@storybook/react";
import Dropdown from "./Dropdown";

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],

  args: {},
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => {
    return <Dropdown optionList={["a", "b", "c"]} />;
  },
};
