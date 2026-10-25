import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Button } from "../../Atoms/Button";
import {
  ChatWidgetIcon,
  Clock,
  Cross,
  Headset,
  Niobot,
  SendIcon,
} from "../../Icon";
import type {
  ChatConversationStatus,
  ChatMessage,
  ChatParticipant,
  ChatSendResult,
  ChatWidgetProps,
} from "./ChatWidget.type";
import { cn } from "../../../utility";
import { ChatMessageBubble } from "./component";

const CHAT_COPY = {
  "participants.supportAgent": "Support",
  "header.connectingTitle": "Connecting to support",
  "header.closedTitle": "Conversation ended",
  "header.nioTitle": "Nio Assistant",
  "header.adminSubtitle": "You are chatting with a support agent",
  "header.connectingSubtitle": "A support agent will join shortly",
  "header.closedSubtitle": "This conversation is closed",
  "header.nioSubtitle": "Ask Nio for help",
  "status.ai": "AI assistant",
  "status.waiting": "Waiting",
  "status.human": "Human support",
  "status.closed": "Closed",
  "input.adminPlaceholder": "Message {{name}}...",
  "input.supportPlaceholder": "Message support...",
  "input.closedPlaceholder": "Conversation closed",
  "input.nioPlaceholder": "Ask Nio anything...",
  "footer.chattingWith": "Chatting with {{name}}",
  "footer.humanRequested": "A support agent will be with you soon",
  "footer.conversationClosed": "This conversation has ended",
  "footer.poweredByNio": "Powered by Nio",
  "accessibility.dialogLabel": "Niom chat support",
  "accessibility.closeChat": "Close chat",
  "accessibility.messagesLabel": "Chat messages",
  "accessibility.nioThinking": "Nio is thinking",
  "accessibility.messageInput": "Type a message",
  "accessibility.sendMessage": "Send message",
  "accessibility.openChat": "Open Niom chat",
  "accessibility.newMessages": "{{count}} new messages",
  "messages.waitingForHuman": "Waiting for human support...",
  "messages.adminJoined": "{{name}} joined the chat",
  "messages.agentJoined": "A support agent joined the chat",
  "messages.nioThinking": "Nio is thinking...",
  "messages.sending": "Sending message...",
  "welcome.title": "Welcome to Niom",
  "welcome.description": "How can we help you today?",
  "errors.resetFailed": "A new conversation could not be started. Please try again.",
  "errors.sendFailed": "Your message could not be sent.",
  "errors.humanUnavailable": "Human support messaging is not available right now.",
  "actions.startingNewChat": "Starting...",
  "actions.startNewChat": "Start a new chat",
} satisfies Record<string, string>;

function t(
  key: keyof typeof CHAT_COPY,
  options?: Record<string, string | number>,
) {
  return CHAT_COPY[key].replace(/\{\{(\w+)\}\}/g, (_, name: string) =>
    String(options?.[name] ?? ""),
  );
}

const createMessage = (
  text: string,
  sender: ChatMessage["sender"],
  participant?: ChatParticipant,
): ChatMessage => ({
  id: crypto.randomUUID(),
  text,
  sender,
  participant,
  participantId: participant?.id,
  createdAt: new Date().toISOString(),
});

export function ChatWidget({
  conversationId,
  initialMessages = [],
  suggestedPrompts = [],
  onSendMessage,
  onSendHumanMessage,
  onResetConversation,
  conversationStatus,
  assignedAdmin,
  incomingMessages,
  className,
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(
    incomingMessages ?? initialMessages,
  );

  const [localStatus, setLocalStatus] =
    useState<ChatConversationStatus>("open");

  const [isSending, setIsSending] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasResetError, setHasResetError] = useState(false);

  const [position, setPosition] = useState({
    x: 24,
    y: 24,
  });

  const [isDragging, setIsDragging] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const positionStart = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);
  const draggingRef = useRef(false);
  const sendingRef = useRef(false);
  const previousConversationId = useRef(conversationId);
  const pendingCustomerMessageId = useRef<string | null>(null);
  const knownIncomingMessageIds = useRef(
    new Set((incomingMessages ?? initialMessages).map((item) => item.id)),
  );

  // Conversation state
  const status = conversationStatus ?? localStatus;

  useEffect(() => {
    if (previousConversationId.current === conversationId) return;
    previousConversationId.current = conversationId;

    const nextMessages = incomingMessages ?? initialMessages;

    setMessages((previous) => {
      // Creating a conversation changes its ID before the server has returned
      // its messages. Keep the optimistic message visible during that handoff.
      if (sendingRef.current) {
        return previous;
      }

      return nextMessages;
    });
    knownIncomingMessageIds.current = new Set(
      nextMessages.map((item) => item.id),
    );
    setUnreadMessageCount(0);
  }, [conversationId, incomingMessages, initialMessages]);

  // Current assigned admin
  const admin =
    assignedAdmin ??
    [...messages].reverse().find((item) => item.sender === "admin")
      ?.participant;

  const adminName =
    admin?.displayName ?? t("participants.supportAgent");

  // Message availability
  const canSend =
    status === "open"
      ? Boolean(onSendMessage)
      : status !== "closed" && Boolean(onSendHumanMessage);

  // Dynamic header
  const headerTitle =
    status === "assigned"
      ? adminName
      : status === "awaiting_human"
        ? t("header.connectingTitle")
        : status === "closed"
          ? t("header.closedTitle")
          : t("header.nioTitle");

  const headerSubtitle =
    status === "assigned"
      ? t("header.adminSubtitle")
      : status === "awaiting_human"
        ? t("header.connectingSubtitle")
        : status === "closed"
          ? t("header.closedSubtitle")
          : t("header.nioSubtitle");

  // Dynamic status label
  const statusLabel =
    status === "open"
      ? t("status.ai")
      : status === "awaiting_human"
        ? t("status.waiting")
        : status === "assigned"
          ? t("status.human")
          : t("status.closed");

  // Dynamic input placeholder
  const placeholder =
    status === "assigned"
      ? t("input.adminPlaceholder", {
          name: adminName,
        })
      : status === "awaiting_human"
        ? t("input.supportPlaceholder")
        : status === "closed"
          ? t("input.closedPlaceholder")
          : t("input.nioPlaceholder");

  // Dynamic footer
  const footerText =
    status === "assigned"
      ? t("footer.chattingWith", {
          name: adminName,
        })
      : status === "awaiting_human"
        ? t("footer.humanRequested")
        : status === "closed"
          ? t("footer.conversationClosed")
          : t("footer.poweredByNio");

  // Merge incoming messages from backend
  useEffect(() => {
    if (!incomingMessages?.length) return;

    const newIncomingMessages = incomingMessages.filter((item) => {
      if (knownIncomingMessageIds.current.has(item.id)) return false;

      knownIncomingMessageIds.current.add(item.id);
      return true;
    });

    if (!isOpen) {
      const newUnreadMessages = newIncomingMessages.filter(
        (item) => item.sender === "assistant" || item.sender === "admin",
      );

      if (newUnreadMessages.length) {
        setUnreadMessageCount((count) => count + newUnreadMessages.length);
      }
    }

    setMessages((previous) => {
      const knownIds = new Set(previous.map((item) => item.id));

      const next = [...previous];

      for (const item of incomingMessages) {
        if (knownIds.has(item.id)) continue;

        knownIds.add(item.id);

        const pendingMessageIndex =
          item.sender === "user" && pendingCustomerMessageId.current
            ? next.findIndex(
                (message) =>
                  message.id === pendingCustomerMessageId.current &&
                  message.text === item.text,
              )
            : -1;

        if (pendingMessageIndex >= 0) {
          next[pendingMessageIndex] = item;
          continue;
        }

        next.push(item);
      }

      if (next.length === previous.length) {
        return previous;
      }

      return next.sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;

        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;

        return aTime - bTime;
      });
    });
  }, [incomingMessages, isOpen]);

  // Automatically scroll to the latest message
  useEffect(() => {
    if (!isOpen) return;

    messagesEndRef.current?.scrollIntoView?.({
      behavior: "smooth",
      block: "nearest",
    });
  }, [isOpen, messages, isSending, status]);

  // Close widget with Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Send customer message
  const handleSendMessage = async (value = message) => {
    const trimmedMessage = value.trim();

    if (
      !trimmedMessage ||
      trimmedMessage.length > 4000 ||
      sendingRef.current ||
      !canSend
    ) {
      return;
    }

    sendingRef.current = true;
    setIsSending(true);
    setHasError(false);
    setHasResetError(false);

    const customerMessage = createMessage(trimmedMessage, "user");
    pendingCustomerMessageId.current = customerMessage.id;

    setMessages((previous) => [...previous, customerMessage]);

    setMessage("");

    try {
      if (status === "open") {
        if (onSendMessage) {
          const reply = await onSendMessage(trimmedMessage);

          if (typeof reply === "string" && reply.trim()) {
            setMessages((previous) => [
              ...previous,
              createMessage(reply, "assistant"),
            ]);
          }

          if (typeof reply !== "string") {
            replaceOptimisticMessage(customerMessage.id, reply);
          }
        } else {
          throw new Error("Chat messaging is not ready.");
        }
      } else if (onSendHumanMessage) {
        // Human support messaging through backend
        const reply = await onSendHumanMessage(trimmedMessage);
        if (reply) replaceOptimisticMessage(customerMessage.id, reply);
      }
    } catch {
      // Remove optimistic customer message
      setMessages((previous) =>
        previous.filter((item) => item.id !== customerMessage.id),
      );

      // Restore unsent message
      setMessage((current) => current || trimmedMessage);

      setHasError(true);
    } finally {
      pendingCustomerMessageId.current = null;
      sendingRef.current = false;
      setIsSending(false);
    }
  };

  const replaceOptimisticMessage = (
    optimisticMessageId: string,
    result: ChatSendResult,
  ) => {
    setMessages((previous) => {
      const next = [
        ...previous.filter((item) => item.id !== optimisticMessageId),
        result.customerMessage,
        ...(result.assistantMessage ? [result.assistantMessage] : []),
      ];

      return [...new Map(next.map((item) => [item.id, item])).values()];
    });
  };

  const handleResetConversation = async () => {
    if (!onResetConversation || isResetting) return;

    setIsResetting(true);
    setHasError(false);
    setHasResetError(false);

    try {
      await onResetConversation();
      setMessages([]);
      setMessage("");

      // A parent that supplies conversationStatus remains authoritative.
      if (!conversationStatus) {
        setLocalStatus("open");
      }
    } catch {
      setHasError(true);
      setHasResetError(true);
    } finally {
      setIsResetting(false);
    }
  };

  // Draggable launcher
  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);

    draggingRef.current = true;
    hasMoved.current = false;
    setIsDragging(true);

    dragStart.current = {
      x: event.clientX,
      y: event.clientY,
    };

    positionStart.current = position;
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!draggingRef.current) return;

    const deltaX = event.clientX - dragStart.current.x;

    const deltaY = event.clientY - dragStart.current.y;

    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      hasMoved.current = true;
    }

    if (!hasMoved.current) return;

    setPosition({
      x: Math.max(
        12,
        Math.min(window.innerWidth - 76, positionStart.current.x - deltaX),
      ),
      y: Math.max(
        12,
        Math.min(window.innerHeight - 76, positionStart.current.y - deltaY),
      ),
    });
  };

  const handlePointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    draggingRef.current = false;
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <>
      {isOpen ? (
        <section
          className={cn(
            "chat-widget-panel fixed inset-0 z-60 flex flex-col overflow-hidden border border-border bg-background shadow-2xl",
            "md:inset-auto md:right-6 md:bottom-8 md:h-152 md:w-96 md:rounded-2xl",
            className,
          )}
          role="dialog"
          aria-label={t("accessibility.dialogLabel")}
        >
          {/* Chat header */}
          <header className="flex items-center gap-3 border-b border-border bg-surface p-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
              {status === "assigned" ? (
                <Headset size={24} />
              ) : status === "awaiting_human" ? (
                <Clock size={24} />
              ) : (
                <Niobot size={26} />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="truncate font-semibold text-foreground">
                {headerTitle}
              </h2>

              <p className="text-xs text-text-secondary">{headerSubtitle}</p>
            </div>

            {/* Conversation status badge */}
            <span
              className={cn(
                "hidden rounded-full px-2 py-1 text-[10px] font-semibold sm:inline-flex",
                status === "open" && "bg-primary/10 text-primary",
                status === "awaiting_human" && "bg-muted text-text-secondary",
                status === "assigned" && "bg-primary/10 text-primary",
                status === "closed" && "bg-muted text-text-secondary",
              )}
            >
              {statusLabel}
            </span>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="shrink-0 hover:bg-muted"
              aria-label={t("accessibility.closeChat")}
            >
              <Cross />
            </Button>
          </header>

          {/* Waiting for human support */}
          {status === "awaiting_human" && (
            <div
              role="status"
              className="flex items-center justify-center gap-2 border-b border-border bg-muted/40 px-3 py-2 text-xs text-text-secondary"
            >
              <Clock size={15} />

              {t("messages.waitingForHuman")}
            </div>
          )}

          {/* Admin joined */}
          {status === "assigned" && (
            <div
              role="status"
              className="flex items-center justify-center gap-2 border-b border-primary/10 bg-primary/5 px-3 py-2 text-xs text-foreground"
            >
              <Headset size={15} />

              {admin
                ? t("messages.adminJoined", {
                    name: adminName,
                  })
                : t("messages.agentJoined")}
            </div>
          )}

          {/* Chat messages */}
          <div
            className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-4"
            role="log"
            aria-label={t("accessibility.messagesLabel")}
            aria-live="polite"
            aria-relevant="additions"
          >
            {/* Welcome screen */}
            {messages.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-primary text-white">
                  <Niobot size={32} />
                </div>

                <h3 className="text-lg font-semibold text-foreground">
                  {t("welcome.title")}
                </h3>

                <p className="max-w-64 text-sm leading-relaxed text-text-secondary">
                  {t("welcome.description")}
                </p>
              </div>
            )}

            {/* Message bubbles */}
            {messages.map((item) => (
              <ChatMessageBubble key={item.id} message={item} />
            ))}

            {/* Nio typing indicator */}
            {isSending && status === "open" && (
              <div
                className="flex items-center gap-3"
                role="status"
                aria-label={t("accessibility.nioThinking")}
              >
                <div className="flex size-8 items-center justify-center rounded-full bg-muted">
                  <Niobot size={17} />
                </div>

                <div className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-3">
                  {[0, 1, 2].map((index) => (
                    <span
                      key={index}
                      className="size-1.5 animate-pulse rounded-full bg-text-secondary"
                      style={{
                        animationDelay: `${index * 180}ms`,
                      }}
                    />
                  ))}
                </div>

                <span className="text-xs text-text-secondary">
                  {t("messages.nioThinking")}
                </span>
              </div>
            )}

            {/* Sending human message */}
            {isSending && status !== "open" && (
              <p role="status" className="text-xs text-text-secondary">
                {t("messages.sending")}
              </p>
            )}

            <div ref={messagesEndRef} aria-hidden="true" />
          </div>

          {/* Suggested prompts */}
          {status === "open" && suggestedPrompts.length > 0 && (
            <div className="flex gap-2 overflow-x-auto border-t border-border px-3 py-3">
              {suggestedPrompts.map((prompt) => (
                <Button
                  key={prompt}
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="shrink-0 gap-2 rounded-full text-xs"
                  disabled={isSending}
                  onClick={() => void handleSendMessage(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          )}

          {/* Message composer */}
          <div className="border-t border-border bg-background p-3">
            {/* Error notification */}
            {hasError && (
              <p role="alert" className="mb-2 text-xs text-danger">
                {hasResetError
                  ? t("errors.resetFailed")
                  : t("errors.sendFailed")}
              </p>
            )}

            {status === "closed" && onResetConversation && (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                disabled={isResetting}
                onClick={() => void handleResetConversation()}
                className="mb-3 w-full gap-2"
              >
                {isResetting
                  ? t("actions.startingNewChat")
                  : t("actions.startNewChat")}
              </Button>
            )}

            {/* Human messaging not connected */}
            {!canSend && status !== "closed" && (
              <p className="mb-2 text-xs text-text-secondary">
                {status === "open"
                  ? "Messaging is not connected yet."
                  : t("errors.humanUnavailable")}
              </p>
            )}

            <form
              className="flex items-center gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                void handleSendMessage();
              }}
            >
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={placeholder}
                aria-label={t("accessibility.messageInput")}
                disabled={!canSend || isSending}
                className="min-w-0 flex-1 rounded-full border border-border bg-muted px-4 py-2 text-sm text-foreground outline-none placeholder:text-text-secondary focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
              />

              <Button
                type="submit"
                disabled={
                  !canSend ||
                  !message.trim() ||
                  message.trim().length > 4000 ||
                  isSending
                }
                className="flex size-10 shrink-0 items-center justify-center rounded-full p-0"
                aria-label={t("accessibility.sendMessage")}
              >
                <SendIcon size={17} />
              </Button>
            </form>

            {/* Chat footer */}
            <p className="mt-2 text-center text-[10px] text-text-secondary">
              {footerText}
            </p>
          </div>
        </section>
      ) : (
        /* Draggable chat launcher */
        <Button
          type="button"
          aria-label={t("accessibility.openChat")}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onClick={(event) => {
            if (event.detail === 0 || !hasMoved.current) {
              setUnreadMessageCount(0);
              setIsOpen(true);
            }
          }}
          className="fixed z-60 flex size-14 touch-none select-none items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105"
          style={{
            right: `${position.x}px`,
            bottom: `${position.y}px`,
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          <ChatWidgetIcon size={28} />
          {unreadMessageCount > 0 && (
            <span
              aria-label={t("accessibility.newMessages", {
                count: unreadMessageCount,
              })}
              className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full border-2 border-background bg-danger px-1 text-xs font-bold text-white"
              role="status"
            >
              {unreadMessageCount > 9 ? "99+" : unreadMessageCount}
            </span>
          )}
        </Button>
      )}
    </>
  );
}
