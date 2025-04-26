const url = "spark-api/v1/chat/completions";
const method = "POST";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer viSMGoufLRBfgvTzKrWS:jRGcrKPPguqZfgDPhZLp",
};
interface IBody {
  model: "lite";
  messages: IMessage[];
  stream?: boolean;
}
interface IMessage {
  role: "user" | "assistant";
  content?: string;
}
const body: IBody = {
  model: "lite",
  messages: [
    {
      role: "user",
    },
  ],
};
const requestInit = (content: string) => {
  body.messages[0].content = content;
  return {
    method,
    headers,
    body: JSON.stringify(body),
  };
};

const streamRequestInit = (content: string) => {
  body.messages[0].content = content;
  body.stream = true;
  return {
    method,
    headers,
    body: JSON.stringify(body),
  };
};

export const liteUserChat = (content: string) => fetch(url, requestInit(content));
export const liteUserChatStream = (content: string) =>
  fetch(url, streamRequestInit(content));
