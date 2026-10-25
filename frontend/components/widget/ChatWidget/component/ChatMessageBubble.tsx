import { Headset, Niobot } from "../../../Icon";
import { cn } from "../../../../utility";
import type { ChatMessage, ChatMessageBubbleProps } from "../ChatWidget.type";

const getParticipantName = (message: ChatMessage) => {
  return (
    message.participant?.displayName ??
    {
      user: "You",
      assistant: "Nio",
      admin: "Support",
      system: "System",
    }[message.sender]
  );
};

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const { sender, text, createdAt } = message;

  const isUser = sender === "user";
  const isAdmin = sender === "admin";
  const isAssistant = sender === "assistant";
  const formattedTime =
    createdAt && !Number.isNaN(new Date(createdAt).getTime())
      ? new Intl.DateTimeFormat(undefined, {
          hour: "numeric",
          minute: "2-digit",
        }).format(new Date(createdAt))
      : undefined;

  // System messages: handoffs, admin joins, etc.
  if (sender === "system") {
    return (
      <div className="flex justify-center py-2">
        <p className="max-w-[90%] rounded-full border border-border bg-muted/50 px-4 py-2 text-center text-xs text-text-secondary">
          {text}
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-end gap-2",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {/* Sender avatar */}
      {!isUser && (
        <div
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full",
            isAdmin ? "bg-primary/10 text-primary" : "bg-muted text-foreground",
          )}
        >
          {isAdmin ? <Headset size={17} /> : <Niobot size={17} />}
        </div>
      )}

      {/* Message content */}
      <div
        className={cn(
          "flex max-w-[78%] min-w-0 flex-col gap-1",
          isUser && "items-end",
        )}
      >
        {/* Sender name and role */}
        <div className="flex items-center gap-2 px-1">
          <span className="text-xs font-semibold text-foreground">
            {getParticipantName(message)}
          </span>

          {isAssistant && (
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-text-secondary">
              AI
            </span>
          )}

          {isAdmin && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
              Human
            </span>
          )}
        </div>

        {/* Message bubble */}
        <div
          className={cn(
            "w-fit max-w-full wrap-break-word whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser && "rounded-br-sm bg-primary text-white",
            isAssistant && "rounded-bl-sm bg-muted text-foreground",
            isAdmin &&
              "rounded-bl-sm border border-primary/20 bg-primary/10 text-foreground",
          )}
        >
          {text}
        </div>

        {/* Localized message timestamp */}
        {formattedTime && (
          <time
            dateTime={createdAt}
            className="px-1 text-[10px] text-text-secondary"
          >
            {formattedTime}
          </time>
        )}
      </div>
    </div>
  );
}
