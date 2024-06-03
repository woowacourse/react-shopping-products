import type { Meta, StoryObj } from "@storybook/react";
import PageTitle from "./PageTitle";

const meta = {
  title: "Components/PageTitle",
  component: PageTitle,
  tags: ["autodocs"],
  args: {
    children: "Title",
  },
} satisfies Meta<typeof PageTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
