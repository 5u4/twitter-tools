import { until } from "@open-draft/until";
import { Media, User } from "@prisma/client";
import fs from "fs";
import got from "got";
import path from "path";
import { logger } from "../loggings/logger";
import { prisma } from "../prisma/client";
import { resourcePath } from "./resourcePath";

/**
 * @returns whether goes out the internet
 */
export const saveMedia = async (media: Media, user?: Pick<User, "id" | "name"> | undefined) => {
  if (!user) {
    const tweet = await prisma.tweet.findFirst({
      where: { id: media.tweetId },
      include: { user: { select: { id: true, name: true } } },
    });
    if (!tweet) throw Error(`Unable to find the tweet of the media ${media}`);
    user = tweet.user;
  }

  const resPath = resourcePath(media, user);
  if (fs.existsSync(resPath)) return false;

  const [[error, resp]] = await Promise.all([
    until(() => got.get(media.url)),
    fs.promises.mkdir(path.dirname(resPath), { recursive: true }),
  ]);

  if (error || !resp) {
    logger.error({ error, resp });
    return true;
  }

  await fs.promises.writeFile(resPath, resp.rawBody);
  return true;
};
