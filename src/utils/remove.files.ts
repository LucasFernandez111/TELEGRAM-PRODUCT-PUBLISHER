import { error } from "console";
import * as fs from "fs/promises";
import * as path from "path";
export const removeFiles = async (directoryPath: string): Promise<void> => {
  try {
    const files = await fs.readdir(directoryPath);

    const deletePromises = files.map(async (file) => {
      const filePath = path.join(directoryPath, file);
      const stat = await fs.stat(filePath);

      if (stat.isFile()) {
        await fs.unlink(filePath);
      }
    });

    await Promise.all(deletePromises);
  } catch (err: Error | any) {
    throw new Error(err);
  }
};
