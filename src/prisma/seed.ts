import { downloadTweets } from "../cmd/downloadTweets";
import { logger } from "../loggings/logger";
import { prisma } from "../prisma/client";

const main = async () => {
  logger.info("start seeding ...");

  await downloadTweets();
};

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
