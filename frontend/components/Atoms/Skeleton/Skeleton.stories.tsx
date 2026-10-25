import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
    title: "Atoms/Skeleton",
    component: Skeleton,
    tags: ["autodocs"],
    argTypes: {
    rounded: {
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
    },
     animated: {
      control: "boolean",
    },
},
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
    args: {
        className: "h-40 w-40",
    },
};
export const Animated: Story = {
  args: {
    className: "h-40 w-40",
    animated: true,
  },
};

export const AnimationDisabled: Story = {
  args: {
    className: "h-40 w-40",
    animated: false,
  },
};

// Rounded Configurations
export const RoundedNone: Story = {
  args: {
    className: "h-12 w-12",
    rounded: "none",
  },
};

export const RoundedSmall: Story = {
  args: {
    className: "h-10 w-24",
    rounded: "sm",
  },
};

export const RoundedMedium: Story = {
  args: {
    className: "h-20 w-30",
    rounded: "md",
  },
};

export const RoundedFull: Story = {
  args: {
    className: "h-40 w-40",
    rounded: "full",
  },
};

// UX Layout Mock Placeholders
export const TextPlaceholder: Story = {
  args: {
    className: "h-4 w-32",
  },
};

export const AvatarPlaceholder: Story = {
  args: {
    className: "size-20",
    rounded: "full",
  },
};

export const ButtonPlaceholder: Story = {
  args: {
    className: "h-10 w-28",
    rounded: "md",
  },
};

export const CardPlaceholder: Story = {
  args: {
    className: "h-96 w-72",
    rounded: "lg",
  },
};