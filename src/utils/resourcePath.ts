import { Media, User } from "@prisma/client";
import path from "path";

export const resourcePath = (media: Media, user: User) => {
  const foldername = `${sanitizePath(user.name)}-${user.id}`;
  const filename = `${media.tweetId}-${media.id}${path.extname(media.url)}`.split("?")[0];
  return path.resolve(__dirname, "..", "..", "data", "res", foldername, filename);
};

const sanitizePath = (name: string) =>
  name
    .replaceAll("/", encodeURIComponent("/"))
    .replaceAll("\\", encodeURIComponent("\\"))
    .replaceAll(" ", encodeURIComponent(" "));
