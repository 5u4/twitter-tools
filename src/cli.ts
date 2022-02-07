import { boolean, command, flag, run } from "cmd-ts";
import { Action, runActions } from "./actions/action";
import { downloadAllMedia } from "./actions/downloadAllMedia";
import { downloadFollowings } from "./actions/downloadFollowings";
import { makeDownloadTweetsAction } from "./actions/downloadTweets";
import { monitoredUserIds } from "./config";

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
    const actions: Action[] = [];

    if (args.followings || args.all) actions.push(downloadFollowings);
    if (args.monitored || args.all)
      actions.push(
        ...monitoredUserIds.map(id => makeDownloadTweetsAction({ id, ignoreDuplicate: true }))
      );
    if (args.tweets || args.all) actions.push(makeDownloadTweetsAction({}));
    if (args.media || args.all) actions.push(downloadAllMedia);

    await runActions(actions);
  },
});

run(cmd, process.argv.slice(2));
