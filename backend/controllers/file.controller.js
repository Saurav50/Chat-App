import Conversation from "../models/conversation.model.js";
import File from "../models/file.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendFile = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.user._id;
    const { fileName, filePath, fileType, fileSize } = req.body;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      // create one
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newFile = await File.create({
      senderId,
      receiverId,
      fileName,
      filePath,
      fileType,
      fileSize,
    });
    if (newFile) {
      conversation.files.push(newFile._id);
    }
    await newFile.save();
    await conversation.save();
    // socket io functionality
    // send event to the receiver user
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newFile", newFile);
    }

    res.status(201).json(newFile);
  } catch (error) {
    res.status(500).json({ error: "internal server error file controller" });
  }
};

export const getFiles = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("files");
    if (!conversation) {
      return res.status(200).json([]);
    }
    res.status(200).json(conversation.files);
  } catch (error) {
    res.status(500).json({ error: "internal server error file controller" });
  }
};
