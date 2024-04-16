import React, { useState, useRef, useEffect } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import EmojiPicker from "emoji-picker-react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { GrAttachment } from "react-icons/gr";
import useFileSend from "../../hooks/useFileSend";
import useConversation from "../../store/useConversation";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { loading, sendMessage } = useSendMessage();
  const emojiPickerRef = useRef(null);
  const [filePreview, setFilePreview] = useState(null);
  const { uploading, sendFile } = useFileSend();
  const { selectedConversation } = useConversation();
  const inputRef = useRef(null);
  useEffect(() => {
    if (selectedConversation) {
      inputRef.current.focus();
    }
  }, [selectedConversation]);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiPicker = (emojiData, event) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji);
  };
  const handleClickOutside = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }
  };
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("attachment-input");
    const file = fileInput.files[0];

    if (!file) {
      if (!message) return;
      await sendMessage(message);
      setMessage("");
      return;
    }
    setFilePreview(null); // Reset file preview
    await sendFile(file);
    // Reset file input value
    fileInput.value = "";
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      {filePreview && (
        <div className="  flex justify-center">
          <img src={filePreview} alt="File Preview" className="w-[300px]" />
        </div>
      )}
      <div className="flex w-full items-center mx-4 gap-2 ">
        <label htmlFor="attachment-input" className="cursor-pointer">
          <GrAttachment />
          <input
            id="attachment-input"
            type="file"
            className="hidden"
            onChange={handleFileSelect}
          />
        </label>
        <form onSubmit={submitHandler} className=" my-3 mr-10  flex-1">
          {showEmojiPicker && (
            <div ref={emojiPickerRef} className="w-[300px] z-10">
              <EmojiPicker
                height={300}
                width={300}
                previewConfig={{
                  showPreview: false,
                }}
                className="mb-2 bg-transparent"
                onEmojiClick={handleEmojiPicker}
              />
            </div>
          )}

          <div className="w-full relative">
            <MdOutlineEmojiEmotions
              onClick={toggleEmojiPicker}
              className="absolute inset-y-0 items-center top-3 ml-2 cursor-pointer"
            />
            <input
              type="text"
              placeholder="Send a message..."
              ref={inputRef}
              className="border text-sm rounded-lg w-full p-2.5 pl-8 bg-gray-700 border-gray-600 text-white"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />

            <button
              type="submit"
              className=" absolute inset-y-0 end-0 items-center px-3"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <BsSend />
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MessageInput;
