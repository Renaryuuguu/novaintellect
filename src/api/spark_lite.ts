import { instance } from ".";
export const liteUserChatStream = (content: string) =>
  instance.post("/v1/chat/completions", {
    model: "lite",
    messages: [
      {
        role: "user",
        content,
      },
    ],
    stream: true,
  });

export const liteUserChat = (content: string) =>
  instance.post("/v1/chat/completions", {
    model: "lite",
    messages: [
      {
        role: "user",
        content,
      },
    ],
  });