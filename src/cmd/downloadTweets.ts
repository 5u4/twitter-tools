import { until } from "@open-draft/until";
import { logger } from "../loggings/logger";
import { prisma } from "../prisma/client";
import { twitter } from "../twitter/client";
import { createTweet } from "../utils/createTweet";

export const downloadTweets = async () => {
  const user = await twitter.currentUser();

  let timeline = await twitter.v1.userTimeline(user.id_str, {
    exclude_replies: true,
    trim_user: false,
  });

  while (true) {
    if (timeline.tweets.length === 0) {
      logger.info(`stopped since the fetched tweets are empty`);
      break;
    }

    const dbTweetIds = await prisma.tweet.findMany({
      select: { id: true },
      where: {
        id: { in: timeline.tweets.map(tweet => (tweet.retweeted_status ?? tweet).id_str) },
      },
    });

    const existingIds = new Set(dbTweetIds.map(({ id }) => id));

    for (const tweet of timeline.tweets) {
      if (existingIds.has((tweet.retweeted_status ?? tweet).id_str)) continue;

      const [error, result] = await until(() => createTweet(prisma, tweet));

      if (error) {
        logger.error(error);
        return;
      }

      logger.info(`inserted ${result.id}`);
    }

    if (existingIds.size > 0) {
      logger.info(`stopped since existing id in db has found`);
      return;
    }

    timeline = await timeline.next();
  }
};
