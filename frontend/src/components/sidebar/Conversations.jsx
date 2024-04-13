import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emoji";
import useListenConversations from "../../hooks/useListenConversations";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  useListenConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((item, idx) => {
        return (
          <Conversation
            key={item._id}
            conversation={item}
            emoji={getRandomEmoji()}
            lastInd={idx === conversations.length - 1}
          />
        );
      })}
      {loading && <div className="loading loading-spinner mx-auto"></div>}
    </div>
  );
};

export default Conversations;
