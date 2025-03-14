import apiRequest from "./api-request";

const getConversation = ({ token }: { token: string }) =>
  apiRequest(`/conversation`, "GET", token);

const createConversation = ({ token, userId }: { token: string, userId: string }) =>
  apiRequest(`/conversation/${userId}`, "POST", token);

const ConversationService = { getConversation, createConversation };

export default ConversationService;
