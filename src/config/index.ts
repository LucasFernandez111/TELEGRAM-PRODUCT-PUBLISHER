import path from "path";

export const BOT_TOKEN = process.env.BOT_TOKEN ?? "";
export const BOT_GROUP = process.env.BOT_GROUP ?? "";
export const ID_GROUP = process.env.ID_GROUP ?? "";
export const dirDocumentPath = path.join(
  __dirname,
  "..",
  "..",
  "uploads",
  "documents"
);
export const generatedPath = path.join(dirDocumentPath, "generated");
export const receivedPath = path.join(dirDocumentPath, "received");
export const imagesBasePath = path.join(
  __dirname,
  "..",
  "..",
  "uploads",
  "images"
);
