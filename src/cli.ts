import { boolean, command, flag, run } from "cmd-ts";
import { downloadAllMedia } from "./cmd/downloadAllMedia";
import { downloadFollowings } from "./cmd/downloadFollowings";
import { downloadTweets } from "./cmd/downloadTweets";
import { monitoredUserIds } from "./config";
import { logger } from "./loggings/logger";

const cmd = command({
  name: "twitter-tools",
  description: "download twitter content",
  version: "0.1.0",
  args: {
    tweets: flag({
      long: "tweets",
      type: boolean,
      description: "download latest tweets",
    }),
    media: flag({
      long: "media",
      type: boolean,
      description: "download all media data to resource folder",
    }),
    followings: flag({
      long: "followings",
      type: boolean,
      description: "download all followings to database",
    }),
    monitored: flag({
      long: "monitored",
      type: boolean,
      description: "download all monitored user timeline",
    }),
  },
  handler: async args => {
    if (args.followings) {
      logger.info("downloading followings");
      await downloadFollowings();
    }

    if (args.monitored) {
      logger.info("downloading monitored user tweets");
      for (const id of monitoredUserIds) await downloadTweets({ id, ignoreDuplicate: true });
    }

    if (args.tweets) {
      logger.info("downloading timeline tweets");
      await downloadTweets({});
    }

    if (args.media) {
      logger.info("downloading media");
      await downloadAllMedia();
    }
  },
});

run(cmd, process.argv.slice(2));