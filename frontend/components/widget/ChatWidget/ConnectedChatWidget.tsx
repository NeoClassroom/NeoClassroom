import { ChatWidget } from "./ChatWidget";
import type { ChatWidgetProps } from "./ChatWidget.type";

export function ConnectedChatWidget(props: ChatWidgetProps) {
  return <ChatWidget {...props} />;
}
