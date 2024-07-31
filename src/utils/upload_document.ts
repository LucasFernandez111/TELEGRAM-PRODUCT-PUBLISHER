import axios, { AxiosResponse } from "axios";
import { Stream } from "stream";
import fs from "fs";
import path from "path";
import { dirDocumentPath } from "../config";

type OutPutPath = string;

export const uploadDocument = async (url: string): Promise<OutPutPath> => {
  const response: AxiosResponse<Stream> = await axios.get(url, {
    responseType: "stream",
  });

  if (!response) throw new Error("getDocument : Document not found");

  const outPutPath = path.join(
    dirDocumentPath,
    "received",
    `${Date.now()}.xlsx`
  );

  const writer = fs.createWriteStream(outPutPath);

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", () => resolve(outPutPath));
    writer.on("error", reject);
  });
};
