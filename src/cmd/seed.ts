import { logger } from "../loggings/logger";
import { prisma } from "../prisma/client";
import { twitter } from "../twitter/client";
import { createTweet } from "../utils/createTweet";

export const seed = async () => {
  logger.info("start seeding ...");

  const user = await twitter.currentUser();

  let timeline = await twitter.v1.userTimeline(user.id_str, {
    exclude_replies: true,
    trim_user: false,
  });

  while (true) {
    if (timeline.tweets.length === 0) break;

    const results = [];
    for (const tweet of timeline.tweets) {
      const result = await createTweet(prisma, tweet);
      results.push(result);
    }
    logger.info(`inserted ${results.length} tweets`);

    timeline = await timeline.next();
  }
};
