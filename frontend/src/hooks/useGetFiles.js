import React, { useEffect, useState } from "react";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";

const useGetFiles = () => {
  const [loading, setLoading] = useState(false);
  const { files, setFiles, selectedConversation } = useConversation();

  useEffect(() => {
    const getFiles = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/files/${selectedConversation._id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setFiles(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getFiles();
    }
  }, [selectedConversation?._id, setFiles]);

  return { loading, files };
};

export default useGetFiles;
