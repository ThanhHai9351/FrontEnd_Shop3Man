import apiRequest from "./api-request";

const getMessages = ({ token, conversationId }: { token: string, conversationId: string }) =>
  apiRequest(`/message/${conversationId}`, "GET", token);

const MessageService = { getMessages };

export default MessageService;
