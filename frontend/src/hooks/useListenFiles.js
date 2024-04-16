import { useEffect } from "react";
import notification from "../assets/popupSound/notification.mp3";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";

const useListenFiles = () => {
  const { socket } = useSocketContext();
  const { files, setFiles, selectedConversation } = useConversation();

  useEffect(() => {
    socket?.on("newFile", (newFile) => {
      newFile.shake = true;
      const sound = new Audio(notification);
      console.log(newFile);
      sound.play();
      if (selectedConversation._id === newFile.senderId) {
        setFiles([...files, newFile]);
      }
    });

    return () => socket?.off("newFile");
  }, [socket, setFiles, files]);
};

export default useListenFiles;
