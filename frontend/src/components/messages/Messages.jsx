import React, { useRef, useEffect, useLayoutEffect } from "react";
import Message from "./Message";
import FileMessage from "./FileMessage";
import useGetMessages from "../../hooks/useGetMessages";
import useGetFiles from "../../hooks/useGetFiles";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";
import useListenFiles from "../../hooks/useListenFiles";

const Messages = () => {
  const { loading: messagesLoading, messages } = useGetMessages();
  const { loading: filesLoading, files } = useGetFiles();
  const lastMessageRef = useRef();
  useListenMessages();
  useListenFiles();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages, files]);

  const renderMessages = () => {
    const allMessages = [...messages, ...files].sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    return allMessages.map((message) => (
      <div key={message._id} ref={lastMessageRef}>
        {message.fileName && message.filePath ? (
          <FileMessage file={message} />
        ) : (
          <Message message={message} />
        )}
      </div>
    ));
  };

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!messagesLoading && !filesLoading && renderMessages()}
      {(messagesLoading || filesLoading) &&
        [...Array(3)].map((_, idx) => (
          <div key={idx}>
            <MessageSkeleton />
          </div>
        ))}
      {!messagesLoading && messages.length === 0 && files.length === 0 && (
        <p className="text-center">
          Send a message or file to start the conversation
        </p>
      )}
    </div>
  );
};

export default Messages;
