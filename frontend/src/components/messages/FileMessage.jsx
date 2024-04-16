import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../store/useConversation";
import { SlDocs } from "react-icons/sl";
import { MdOutlineDownloading } from "react-icons/md";

export function extractTime(dateString) {
  const date = new Date(dateString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
  return number.toString().padStart(2, "0");
}
// Helper function to convert bytes to a human-readable format
const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
const FileMessage = ({ file }) => {
  const { fileName, fileType, filePath: url } = file;

  const downloadFile = () => {
    // Implement download logic here
    window.open(url, "_blank");
  };

  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = file.senderId === authUser._id;
  const formattedTime = extractTime(file.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const shaking = file.shake ? "shake" : "";
  // Trim file name to display only the first 20 characters
  let originalfName;
  if (fromMe) {
    originalfName = fileName.replace(`${selectedConversation._id}_`, "");
  } else {
    originalfName = fileName.replace(`${authUser._id}_`, "");
  }
  const trimmedFileName =
    originalfName.length > 5
      ? originalfName.substring(0, 5) + "..."
      : originalfName;

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Profile" src={profilePic} />
        </div>
      </div>
      <div className={`text-white ${shaking} pb-2`}>
        {fileType.startsWith("image") && (
          <img
            src={url}
            alt=" media expired"
            className="h-[100px] w-[150px] object-cover"
            onClick={downloadFile}
          />
        )}
        {fileType.startsWith("video") && (
          <video
            src={url}
            controls
            className="h-[100px] w-[150px] object-cover"
            onClick={downloadFile}
          />
        )}
        {fileType.startsWith("application") && (
          <div className="border border-gray-400 rounded-md p-1">
            <div className="flex gap-2 items-center  p-2 rounded-sm border bg-[#555] border-gray-400">
              <div className="flex flex-col gap-1 justify-center items-center">
                <SlDocs />

                <span className="text-[8px]">
                  {fileType.replace("application/", "")}
                </span>
              </div>
              <p className="flex items-center gap-1 text-xs">
                <span className="text-[6px]">● </span>
                {trimmedFileName}
                <span className="text-[6px]">● </span>
              </p>
              <p className="text-xs">{formatFileSize(file.fileSize)}</p>
              <MdOutlineDownloading
                className="cursor-pointer"
                onClick={downloadFile}
              />
            </div>
          </div>
        )}
        {!fileType.startsWith("image") &&
          !fileType.startsWith("video") &&
          !fileType.startsWith("application") && (
            <>
              <p>{trimmedFileName}</p>
              <button onClick={downloadFile}>Download</button>
            </>
          )}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default FileMessage;
