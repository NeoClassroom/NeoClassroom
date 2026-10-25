import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Searchbar } from "./Searchbar";

const meta = {
  title: "Atoms/Searchbar",
  component: Searchbar,
  args: {
    title: "Search courses",
    placeholder: "Try “biology”",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Searchbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("searchbox", { name: "Search courses" });

    await userEvent.type(input, "biology");
    await expect(input).toHaveValue("biology");
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Minimal: Story = {
  args: {
    variant: "tertiary",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: "Mathematics",
  },
};