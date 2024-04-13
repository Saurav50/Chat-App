import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
export const SocketContext = createContext();
import io from "socket.io-client";

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();
  useEffect(() => {
    if (authUser) {
      const socket = io("https://chat-app-rv46.onrender.com", {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(socket);
      // listening
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    }
    if (socket) {
      socket.close();
      setSocket(null);
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, setOnlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
