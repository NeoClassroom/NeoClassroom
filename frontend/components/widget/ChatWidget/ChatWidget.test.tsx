import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import type { ChatParticipant } from "./ChatWidget.type";

import { ChatWidget } from "./ChatWidget";

const aisha: ChatParticipant = {
  id: "admin-aisha",
  role: "admin",
  displayName: "Aisha",
};

afterEach(cleanup);

// JSDOM does not always implement browser methods.
beforeAll(() => {
  Object.defineProperty(Element.prototype, "scrollIntoView", {
    configurable: true,
    writable: true,
    value: vi.fn(),
  });

  if (!globalThis.crypto.randomUUID) {
    let counter = 0;

    Object.defineProperty(globalThis.crypto, "randomUUID", {
      configurable: true,
      value: () => `test-message-${++counter}`,
    });
  }
});

const openChat = () => {
  fireEvent.click(
    screen.getByRole("button", {
      name: "Open Niom chat",
    }),
  );

  return screen.getByRole("dialog", {
    name: "Niom chat support",
  });
};

describe("ChatWidget", () => {
  it("opens a responsive chat dialog", () => {
    render(<ChatWidget onSendMessage={async () => "Happy to help!"} />);

    const dialog = openChat();

    expect(dialog).toHaveClass("fixed", "inset-0", "chat-widget-panel");

    expect(
      screen.getByRole("log", {
        name: "Chat messages",
      }),
    ).toHaveClass("min-h-0", "overflow-y-auto");

    expect(
      screen.queryByRole("button", {
        name: "Open Niom chat",
      }),
    ).not.toBeInTheDocument();
  });

  it("adds a customer message and clears the input", async () => {
    const onSendMessage = vi.fn(async () => "Happy to help!");

    render(<ChatWidget onSendMessage={onSendMessage} />);

    openChat();

    const input = screen.getByPlaceholderText("Ask Nio anything...");

    fireEvent.change(input, {
      target: { value: "I need help" },
    });

    fireEvent.submit(input.closest("form")!);

    expect(screen.getByRole("log")).toHaveTextContent("I need help");

    expect(input).toHaveValue("");

    await waitFor(() => {
      expect(onSendMessage).toHaveBeenCalledWith("I need help");
    });

    expect(await screen.findByText("Happy to help!")).toBeInTheDocument();
  });

  it("keeps a suggested prompt visible while a new conversation is created", async () => {
    let resolveSend!: (result: string) => void;
    const onSendMessage = vi.fn(
      () =>
        new Promise<string>((resolve) => {
          resolveSend = resolve;
        }),
    );
    const { rerender } = render(
      <ChatWidget
        incomingMessages={[]}
        onSendMessage={onSendMessage}
        suggestedPrompts={["Find a laptop"]}
      />,
    );

    openChat();
    fireEvent.click(screen.getByRole("button", { name: "Find a laptop" }));

    expect(screen.getByRole("log")).toHaveTextContent("Find a laptop");

    rerender(
      <ChatWidget
        conversationId="new-conversation"
        incomingMessages={[]}
        onSendMessage={onSendMessage}
        suggestedPrompts={["Find a laptop"]}
      />,
    );

    expect(screen.getByRole("log")).toHaveTextContent("Find a laptop");

    rerender(
      <ChatWidget
        conversationId="new-conversation"
        incomingMessages={[
          {
            id: "server-customer-message",
            sender: "user",
            text: "Find a laptop",
          },
        ]}
        onSendMessage={onSendMessage}
        suggestedPrompts={["Find a laptop"]}
      />,
    );

    expect(
      within(screen.getByRole("log")).getAllByText("Find a laptop"),
    ).toHaveLength(1);

    resolveSend("Here are some laptop options.");

    expect(
      await screen.findByText("Here are some laptop options."),
    ).toBeInTheDocument();
  });

  it("closes when Escape is pressed", () => {
    render(<ChatWidget onSendMessage={async () => "Happy to help!"} />);

    openChat();

    fireEvent.keyDown(window, {
      key: "Escape",
    });

    expect(
      screen.queryByRole("dialog", {
        name: "Niom chat support",
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Open Niom chat",
      }),
    ).toBeInTheDocument();
  });

  it("identifies Nio as the AI assistant", () => {
    render(
      <ChatWidget
        initialMessages={[
          {
            id: "nio-message",
            sender: "assistant",
            text: "Hello! I'm Nio.",
            participant: {
              id: "nio",
              role: "assistant",
              displayName: "Nio",
            },
          },
        ]}
      />,
    );

    openChat();

    expect(screen.getByText("Hello! I'm Nio.")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Nio Assistant",
      }),
    ).toBeInTheDocument();

    expect(screen.getAllByText("AI").length).toBeGreaterThan(0);
  });

  it("identifies a named human support participant", () => {
    render(
      <ChatWidget
        conversationStatus="assigned"
        assignedAdmin={aisha}
        initialMessages={[
          {
            id: "admin-message",
            sender: "admin",
            text: "I'm here to help with your order.",
            participant: aisha,
          },
        ]}
        onSendHumanMessage={async () => {}}
      />,
    );

    openChat();

    expect(
      screen.getByRole("heading", {
        name: "Aisha",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("I'm here to help with your order."),
    ).toBeInTheDocument();

    expect(screen.getByText("Aisha joined the chat")).toBeInTheDocument();

    expect(screen.getAllByText("Human").length).toBeGreaterThan(0);
  });

  it("shows the waiting state after a human handoff", () => {
    render(
      <ChatWidget
        conversationStatus="awaiting_human"
        initialMessages={[
          {
            id: "handoff-request",
            sender: "system",
            text: "Nio requested human support.",
          },
        ]}
      />,
    );

    openChat();

    expect(
      screen.getByRole("heading", {
        name: "Connecting to support",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Nio requested human support."),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Waiting for human support..."),
    ).toBeInTheDocument();

    // Without a backend callback, human messaging
    // must remain disabled.
    expect(screen.getByPlaceholderText("Message support...")).toBeDisabled();
  });

  it("sends a message to the assigned admin", async () => {
    const onSendHumanMessage = vi.fn(async () => {});

    render(
      <ChatWidget
        conversationStatus="assigned"
        assignedAdmin={aisha}
        onSendHumanMessage={onSendHumanMessage}
      />,
    );

    openChat();

    const input = screen.getByPlaceholderText("Message Aisha...");

    expect(input).toBeEnabled();

    fireEvent.change(input, {
      target: {
        value: "I need help with delivery",
      },
    });

    fireEvent.submit(input.closest("form")!);

    await waitFor(() => {
      expect(onSendHumanMessage).toHaveBeenCalledWith(
        "I need help with delivery",
      );
    });

    expect(screen.getByRole("log")).toHaveTextContent(
      "I need help with delivery",
    );

    expect(input).toHaveValue("");
  });

  it("starts a new chat after a conversation is closed", async () => {
    const onResetConversation = vi.fn(async () => {});

    render(
      <ChatWidget
        conversationStatus="closed"
        initialMessages={[
          { id: "old-message", sender: "user", text: "Old chat" },
        ]}
        onResetConversation={onResetConversation}
      />,
    );

    openChat();
    fireEvent.click(screen.getByRole("button", { name: "Start a new chat" }));

    await waitFor(() => expect(onResetConversation).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(screen.queryByText("Old chat")).not.toBeInTheDocument(),
    );
  });

  it("displays incoming admin messages", async () => {
    render(
      <ChatWidget
        conversationStatus="assigned"
        assignedAdmin={aisha}
        onSendHumanMessage={async () => {}}
        incomingMessages={[
          {
            id: "incoming-admin-message",
            sender: "admin",
            text: "Hello! How can I help you?",
            participantId: aisha.id,
            participant: aisha,
            createdAt: "2026-10-22T09:15:00+04:00",
          },
        ]}
      />,
    );

    openChat();

    expect(
      await screen.findByText("Hello! How can I help you?"),
    ).toBeInTheDocument();
  });

  it("shows a badge for new assistant or admin messages received while closed", async () => {
    const { rerender } = render(
      <ChatWidget
        incomingMessages={[
          { id: "existing", sender: "user", text: "I need help" },
        ]}
      />,
    );

    rerender(
      <ChatWidget
        incomingMessages={[
          { id: "existing", sender: "user", text: "I need help" },
          { id: "reply", sender: "admin", text: "How can I help?" },
        ]}
      />,
    );

    expect(await screen.findByRole("status")).toHaveTextContent("1");

    openChat();

    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
  });

  it("disables messaging when the conversation is closed", () => {
    render(<ChatWidget conversationStatus="closed" assignedAdmin={aisha} />);

    openChat();

    expect(
      screen.getByRole("heading", {
        name: "Conversation ended",
      }),
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Conversation closed")).toBeDisabled();

    expect(
      screen.getByRole("button", {
        name: "Send message",
      }),
    ).toBeDisabled();
  });

  it("displays suggested prompts", () => {
    render(
      <ChatWidget
        suggestedPrompts={["Find a laptop", "Show gaming deals"]}
        onSendMessage={async () => "Sure!"}
      />,
    );

    openChat();

    expect(
      screen.getByRole("button", {
        name: "Find a laptop",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Show gaming deals",
      }),
    ).toBeInTheDocument();
  });

  it("restores the input when sending fails", async () => {
    const onSendMessage = vi.fn(async () => {
      throw new Error("Network unavailable");
    });

    render(<ChatWidget onSendMessage={onSendMessage} />);

    openChat();

    const input = screen.getByPlaceholderText("Ask Nio anything...");

    fireEvent.change(input, {
      target: { value: "Help me" },
    });

    fireEvent.submit(input.closest("form")!);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Your message could not be sent.",
      );
    });

    expect(input).toHaveValue("Help me");
  });
});
