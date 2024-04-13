import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../store/useConversation";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const { conversations, setConversations } = useConversation();
  useEffect(() => {
    const getConversations = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.error) throw new Error(error);
        // SET CONVERSATION STATE
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
