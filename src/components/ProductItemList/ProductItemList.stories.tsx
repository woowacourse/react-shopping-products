import type { Meta, StoryObj } from "@storybook/react";
import ProductItemList from "./ProductItemList";
import { Category } from "../../interfaces/Product";
import { Sorting } from "../../interfaces/Sorting";

const meta = {
  title: "Components/ProductItemList",
  component: ProductItemList,
  tags: ["autodocs"],
} satisfies Meta<typeof ProductItemList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    category: "fitness" as Category,
    sortOption: "price,desc" as Sorting,
    onError: () => {},
  },
};
