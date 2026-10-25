export type ChatMessageSender = "user" | "assistant" | "admin" | "system";

export type ChatParticipantRole = "customer" | "assistant" | "admin";

export type ChatConversationStatus =
  | "open"
  | "awaiting_human"
  | "assigned"
  | "closed";

export interface ChatParticipant {
  id: string;
  role: ChatParticipantRole;
  displayName: string;
  joinedAt?: string;
  leftAt?: string | null;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: ChatMessageSender;
  participantId?: string | null;
  participant?: ChatParticipant;
  createdAt?: string;
}

export interface ChatSendResult {
  customerMessage: ChatMessage;
  assistantMessage?: ChatMessage;
}

export interface ChatWidgetProps {
  conversationId?: string | null;
  initialMessages?: ChatMessage[];
  suggestedPrompts?: string[];

  /** Existing Nio AI callback. */
  onSendMessage?: (message: string) => Promise<string | ChatSendResult>;

  /** Human support messaging, connected later to ASP.NET. */
  onSendHumanMessage?: (message: string) => Promise<void | ChatSendResult>;

  /** Ends this customer chat and creates a fresh conversation. */
  onResetConversation?: () => Promise<void>;

  /** Optional authoritative backend conversation status. */
  conversationStatus?: ChatConversationStatus;

  /** Admin assigned to the conversation. */
  assignedAdmin?: ChatParticipant | null;

  /** Messages received from polling or realtime updates. */
  incomingMessages?: ChatMessage[];

  className?: string;
}

export interface ChatMessageBubbleProps {
  message: ChatMessage;
}
