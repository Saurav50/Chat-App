import React, { useState, useRef, useEffect } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import EmojiPicker from "emoji-picker-react";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { loading, sendMessage } = useSendMessage();
  const emojiPickerRef = useRef(null);
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

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <form onSubmit={submitHandler} className="px-4 my-3">
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
  );
};

export default MessageInput;
