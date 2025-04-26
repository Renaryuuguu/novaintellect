import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";

interface Message {
  id: string;
  content: string | File;
  type: "text" | "image" | "pdf";
  role: "user" | "assistant";
  timestamp: number;
}

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  gap: 20px;
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
`;

const MessageItem = styled.div<{ role: "user" | "assistant" }>`
  display: flex;
  margin-bottom: 20px;
  justify-content: ${(props) =>
    props.role === "user" ? "flex-end" : "flex-start"};
`;

const MessageContent = styled.div<{ role: "user" | "assistant" }>`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 12px;
  background-color: ${(props) =>
    props.role === "user" ? "#1a73e8" : "#f1f3f4"};
  color: ${(props) => (props.role === "user" ? "#fff" : "#000")};
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
`;

const TextArea = styled.textarea`
  flex: 1;
  min-height: 40px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  resize: none;
  outline: none;
  font-family: inherit;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #1a73e8;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1557b0;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileButton = styled.button`
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: #f1f3f4;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e8eaed;
  }
`;

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputText,
      type: "text",
      role: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileType = file.type.startsWith("image/") ? "image" : "pdf";
    const newMessage: Message = {
      id: Date.now().toString(),
      content: file,
      type: fileType,
      role: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  const renderMessage = (message: Message) => {
    if (message.type === "text") {
      return (
        <MessageContent role={message.role}>
          {message.content as string}
        </MessageContent>
      );
    } else if (message.type === "image") {
      return (
        <MessageContent role={message.role}>
          <img
            src={URL.createObjectURL(message.content as File)}
            alt="Uploaded content"
            style={{ maxWidth: "100%", borderRadius: "8px" }}
          />
        </MessageContent>
      );
    } else if (message.type === "pdf") {
      return (
        <MessageContent role={message.role}>
          <div>PDF文件: {(message.content as File).name}</div>
        </MessageContent>
      );
    }
  };

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ChatContainer>
      <MessageList ref={messageListRef}>
        {messages.map((message) => (
          <MessageItem key={message.id} role={message.role}>
            {renderMessage(message)}
          </MessageItem>
        ))}
      </MessageList>
      <InputContainer>
        <FileButton onClick={() => fileInputRef.current?.click()}>
          <span>📎</span>
        </FileButton>
        <FileInput
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*,.pdf"
        />
        <TextArea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="输入消息..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <Button onClick={handleSendMessage} disabled={!inputText.trim()}>
          发送
        </Button>
      </InputContainer>
    </ChatContainer>
  );
};
