import { putObjectUrl, getObjectUrl } from "../controllers/s3.controller.js";

const uploadFile = async (req, res) => {
  try {
    const { filename, contentType } = req.body;
    console.log(filename, contentType);
    const uploadUrl = await putObjectUrl(filename, contentType);
    res.json({ uploadUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload file" });
  }
};

const getFileUrl = async (req, res) => {
  try {
    const { key } = req.body;
    const fileUrl = await getObjectUrl(key);
    res.json({ fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get file URL" });
  }
};

export { uploadFile, getFileUrl };
