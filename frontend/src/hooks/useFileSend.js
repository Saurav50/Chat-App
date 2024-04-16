import { useState } from "react";
import useConversation from "../store/useConversation";

const useFileSend = () => {
  const [uploading, setUploading] = useState(false);
  const { selectedConversation, files, setFiles } = useConversation();

  const sendFile = async (file) => {
    setUploading(true);
    try {
      // Construct a unique filename based on the selected conversation ID and the original filename
      const uniqueFilename = `${selectedConversation._id}_${file.name}`;

      const fileMetadata = {
        filename: uniqueFilename,
        contentType: file.type,
      };

      const response = await fetch("/api/s3/putUrl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fileMetadata),
      });

      const data = await response.json();

      const uploadResponse = await fetch(data.uploadUrl, {
        method: "PUT",
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file to S3");
      }

      const uploadedUrl = await getUploadedUrl(uniqueFilename);
      const mongoResponse = await fetch(
        `/api/files/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileName: uniqueFilename,
            fileType: file.type,
            filePath: uploadedUrl,
            fileSize: file.size,
          }),
        }
      );
      const mongodata = await mongoResponse.json();
      if (mongodata.error) throw new Error(mongodata.error);
      console.log(mongodata);
      setFiles([...files, mongodata]);
    } catch (error) {
      console.log(error);
      return null; // Handle the error as needed
    } finally {
      setUploading(false);
    }
  };

  const getUploadedUrl = async (filename) => {
    try {
      const response = await fetch("/api/s3/getUrl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: `uploads/user-uploads/${filename}`,
        }),
      });
      const data = await response.json();
      return data.fileUrl;
    } catch (error) {
      console.error(error);
      return null; // Handle the error as needed
    }
  };

  return { uploading, sendFile };
};

export default useFileSend;
