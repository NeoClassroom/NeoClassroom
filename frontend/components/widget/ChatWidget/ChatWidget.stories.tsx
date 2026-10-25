import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { fn, userEvent, within } from "storybook/test";

import type { ChatMessage, ChatParticipant } from "./ChatWidget.type";

import { ChatWidget } from "./ChatWidget";

// Mock participants
const nio: ChatParticipant = {
  id: "nio",
  role: "assistant",
  displayName: "neo",
};

const aisha: ChatParticipant = {
  id: "admin-aisha",
  role: "admin",
  displayName: "Aisha",
};

const guest: ChatParticipant = {
  id: "guest",
  role: "customer",
  displayName: "Guest",
};

// Mock conversation
const conversationMessages: ChatMessage[] = [
  {
    id: "welcome",
    sender: "assistant",
    text: "Welcome back! What can I help you shop for?",
    participant: nio,
    createdAt: "2026-10-22T09:00:00+04:00",
  },
  {
    id: "visitor-question",
    sender: "user",
    text: "I need something for a new home office.",
    createdAt: "2026-10-22T09:01:00+04:00",
  },
  {
    id: "nio-answer",
    sender: "assistant",
    text: "I can help with that. Would you like desk essentials, tech, or both?",
    participant: nio,
    createdAt: "2026-10-22T09:02:00+04:00",
  },
];

// Human support handoff
const handoffMessages: ChatMessage[] = [
  {
    id: "customer-handoff",
    sender: "user",
    text: "Can I speak with a human?",
    createdAt: "2026-10-22T09:10:00+04:00",
  },
  {
    id: "nio-handoff",
    sender: "assistant",
    text: "Of course! I'll connect you with our support team.",
    participant: nio,
    createdAt: "2026-10-22T09:11:00+04:00",
  },
  {
    id: "handoff-requested",
    sender: "system",
    text: "Nio requested human support.",
    createdAt: "2026-10-22T09:11:00+04:00",
  },
];

// Admin joined messages
const adminMessages: ChatMessage[] = [
  {
    id: "admin-joined",
    sender: "system",
    text: "Aisha joined the chat.",
    createdAt: "2026-10-22T09:12:00+04:00",
  },
  {
    id: "admin-greeting",
    sender: "admin",
    text: "Hello! I'm Aisha from Niom support. How can I help you today?",
    participantId: aisha.id,
    participant: aisha,
    createdAt: "2026-10-22T09:13:00+04:00",
  },
  {
    id: "customer-reply",
    sender: "user",
    text: "I'd like to know more about delivery options.",
    createdAt: "2026-10-22T09:14:00+04:00",
  },
  {
    id: "admin-reply",
    sender: "admin",
    text: "Certainly! Let me help you with our delivery options.",
    participantId: aisha.id,
    participant: aisha,
    createdAt: "2026-10-22T09:15:00+04:00",
  },
];

function UnreadMessageBadgePreview() {
  const [incomingMessages, setIncomingMessages] = useState<ChatMessage[]>([
    {
      id: "badge-customer-message",
      sender: "user",
      text: "Could you help me with delivery?",
      createdAt: "2026-10-22T09:20:00+04:00",
    },
  ]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIncomingMessages((messages) => [
        ...messages,
        {
          id: "badge-admin-reply",
          sender: "admin",
          text: "Of course — how can I help?",
          participant: aisha,
          participantId: aisha.id,
          createdAt: "2026-10-22T09:21:00+04:00",
        },
      ]);
    }, 800);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <ChatWidget
      assignedAdmin={aisha}
      conversationStatus="assigned"
      incomingMessages={incomingMessages}
      onSendHumanMessage={fn(async () => {})}
    />
  );
}

const meta = {
  title: "Widgets/ChatWidget",
  component: ChatWidget,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],

  argTypes: {
    conversationStatus: {
      control: "select",
      options: ["open", "awaiting_human", "assigned", "closed"],
    },
  },

  args: {
    suggestedPrompts: [
      "Find a desk setup",
      "Show me gaming deals",
      "Recommend a gift",
    ],

    onSendMessage: fn(async (message: string) =>
      message.toLowerCase().includes("gift")
        ? "Great choice! Tell me who it's for and your budget, and I'll narrow it down."
        : "I can help with that. What kind of product are you looking for?",
    ),
  },

  render: (args) => (
    <div className="min-h-screen bg-background">
      <ChatWidget {...args} />
    </div>
  ),
} satisfies Meta<typeof ChatWidget>;

export default meta;

type Story = StoryObj<typeof meta>;

const openChat: NonNullable<Story["play"]> = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(
    canvas.getByRole("button", {
      name: "Open Niom chat",
    }),
  );
};

export const Default: Story = {
  args: {
    conversationStatus: "open",
  },
  play: openChat,
};

export const WithConversation: Story = {
  args: {
    conversationStatus: "open",
    initialMessages: conversationMessages,
  },
  play: openChat,
};

export const GuestConversation: Story = {
  args: {
    conversationStatus: "open",
    initialMessages: [
      {
        id: "guest-message",
        sender: "user",
        text: "Hello! I'm visiting Niom for the first time.",
        participant: guest,
        createdAt: "2026-10-22T09:00:00+04:00",
      },
      {
        id: "nio-guest-reply",
        sender: "assistant",
        text: "Welcome to Niom! I'm Nio, your AI shopping assistant. What can I help you find?",
        participant: nio,
        createdAt: "2026-10-22T09:01:00+04:00",
      },
    ],
  },
  play: openChat,
};

export const WaitingForHuman: Story = {
  args: {
    conversationStatus: "awaiting_human",
    initialMessages: handoffMessages,
    onSendHumanMessage: fn(async () => {}),
  },
  play: openChat,
};

export const AdminJoined: Story = {
  args: {
    conversationStatus: "assigned",
    assignedAdmin: aisha,
    initialMessages: handoffMessages,
    incomingMessages: adminMessages,
    onSendHumanMessage: fn(async () => {}),
  },
  play: openChat,
};

/** A new support reply received after the customer has closed the widget. */
export const UnreadMessageBadge: Story = {
  render: () => <UnreadMessageBadgePreview />,
};

export const Closed: Story = {
  args: {
    conversationStatus: "closed",
    assignedAdmin: aisha,
    onResetConversation: fn(async () => {}),
    initialMessages: [
      ...handoffMessages,
      ...adminMessages,
      {
        id: "conversation-closed",
        sender: "system",
        text: "This conversation has been closed.",
        createdAt: "2026-10-22T09:20:00+04:00",
      },
    ],
  },
  play: openChat,
};

/** The closed-chat screen with the customer-facing start-new-chat action. */
export const StartNewChatAction: Story = {
  args: {
    conversationStatus: "closed",
    initialMessages: [
      {
        id: "closed-chat",
        sender: "system",
        text: "This conversation has been closed.",
        createdAt: "2026-10-22T09:20:00+04:00",
      },
    ],
    onResetConversation: fn(async () => {}),
  },
  play: openChat,
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  args: {
    conversationStatus: "open",
    initialMessages: conversationMessages,
  },
  play: openChat,
};

export const LauncherOnly: Story = {
  args: {
    conversationStatus: "open",
  },
};
