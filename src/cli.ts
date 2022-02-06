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
    all: flag({
      long: "all",
      short: "a",
      type: boolean,
      description: "download everything available",
    }),
  },
  handler: async args => {
    if (args.followings || args.all) {
      logger.info("downloading followings");
      await downloadFollowings();
    }

    if (args.monitored || args.all) {
      logger.info("downloading monitored user tweets");
      for (const id of monitoredUserIds) await downloadTweets({ id, ignoreDuplicate: true });
    }

    if (args.tweets || args.all) {
      logger.info("downloading timeline tweets");
      await downloadTweets({});
    }

    if (args.media || args.all) {
      logger.info("downloading media");
      await downloadAllMedia();
    }
  },
});

run(cmd, process.argv.slice(2));
