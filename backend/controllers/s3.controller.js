// s3.js
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const MAX_EXPIRATION_TIME = 604800; // 7 days in seconds

const getObjectUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: "chat.app.dev",
    Key: key,
  });
  const URL = await getSignedUrl(s3Client, command, {
    expiresIn: MAX_EXPIRATION_TIME,
  });
  return URL;
};

const putObjectUrl = async (filename, contentType) => {
  const command = new PutObjectCommand({
    Bucket: "chat.app.dev",
    Key: `uploads/user-uploads/${filename}`,
    ContentType: contentType,
  });

  const URL = await getSignedUrl(s3Client, command, {
    expiresIn: MAX_EXPIRATION_TIME,
  });

  return URL;
};

export { getObjectUrl, putObjectUrl };
