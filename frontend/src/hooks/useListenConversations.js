import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../store/useConversation";

const useListenConversations = () => {
  const { socket } = useSocketContext();
  const { conversations, setConversations } = useConversation();

  useEffect(() => {
    socket?.on("NEW_USER_JOINED", (conversation) => {
      setConversations([...conversations, conversation]);
    });

    return () => socket?.off("NEW_USER_JOINED");
  }, [socket, conversations, setConversations]);
};
export default useListenConversations;
