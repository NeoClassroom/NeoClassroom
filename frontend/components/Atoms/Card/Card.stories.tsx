import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card } from "./Card";
import { CARD_PADDING_OPTIONS, CARD_VARIANTS } from "./Card.constants";

const meta = {
  title: "Atoms/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    padding: {
      control: "select",
      options: CARD_PADDING_OPTIONS,
    },
    variant: {
      control: "select",
      options: CARD_VARIANTS,
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="grid h-48 w-64 place-items-center text-sm font-semibold">
        Card
      </div>
    ),
  },
};

export const Muted: Story = {
  args: {
    children: (
      <div className="grid h-48 w-64 place-items-center text-sm font-semibold">
        Muted card
      </div>
    ),
    variant: "muted",
  },
};

export const NoPadding: Story = {
  args: {
    children: <div className="h-48 w-64 bg-surface-hover" />,
    padding: "none",
  },
};
