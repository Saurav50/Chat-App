import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../store/useConversation";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return selectedConversation ? (
    <div className="md:min-w-[450px] flex flex-col">
      {/* header */}
      <div className="px-4 py-2 mb-2 bg-slate-500">
        <span className="label-text">To:</span>
        <span className="text-gray-900 font-bold">
          {" "}
          {selectedConversation.fullName}
        </span>
      </div>
      {/* messages */}
      <Messages />
      {/* message send input */}
      <MessageInput />
    </div>
  ) : (
    <NoChatSelected />
  );
};

export default MessageContainer;

// for no chat selected
const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex justify-center items-center md:min-w-[450px] w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} 🌐</p>
        <p>Select a chart to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
