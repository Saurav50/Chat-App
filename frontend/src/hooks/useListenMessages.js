import { useEffect } from "react";
import notification from "../assets/popupSound/notification.mp3";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shake = true;
      const sound = new Audio(notification);
      console.log(newMessage);
      sound.play();
      if (selectedConversation._id === newMessage.senderId) {
        setMessages([...messages, newMessage]);
      }
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
