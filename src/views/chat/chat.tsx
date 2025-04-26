import { FC, useState } from "react";
import { liteUserChatStream } from "@/api/spark_lite_fetch";
import handleFetchData from "@/utils/handleFecthData";

/**
 * 
 * data: {"code":0,"message":"Success","sid":"cha000b2cb5@dx1966f7015d29a4b532","id":"cha000b2cb5@dx1966f7015d29a4b532","created":1745626339,"choices":[{"delta":{"role":"assistant","content":"你好"},"index":0}]}

 */
const Chat: FC = () => {
  const [content, setContent] = useState("");
  const handleClick = async () => {
    const response = await liteUserChatStream(
      // "请向我提多个前端相关的问题，分多次发送给我"
      "你好"
    );
    console.log(response);
    const reader = response.body?.getReader();
    while (true) {
      const { done, value } = await reader?.read();
      if (done) break;
      // handleFetchData(value);
      const text = new TextDecoder().decode(value);
      if (text.includes("data: [DONE]")) {
        break;
      }
      if (text.startsWith("data:")) {
        try {
          const { content, role, sid, id } = handleFetchData(value);
          console.log(content, role, sid, id);
          setContent((pre) => pre + content);
        } catch (e) {
          console.error("Error parsing stream data:", e);
        }
      }
    }
  };
  return (
    <div>
      Chat
      <button onClick={handleClick}>发起对话</button>
      {content}
    </div>
  );
};
export default Chat;
