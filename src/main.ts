import prompts from "prompts";
import { downloadAllMedia } from "./cmd/downloadAllMedia";
import { downloadFollowings } from "./cmd/downloadFollowings";
import { downloadTweets } from "./cmd/downloadTweets";

enum CmdAction {
  DownloadTweets,
  DownloadMedia,
  DownloadFollowings,
  DownloadUserTimeline,
}

const main = async () => {
  const resp = await prompts([
    {
      type: "select",
      name: "cmd",
      message: "Select your command action",
      choices: [
        {
          title: "download tweets",
          description: "Download latest tweets",
          value: CmdAction.DownloadTweets,
        },
        {
          title: "download media",
          description: "Download all media data to resource folder",
          value: CmdAction.DownloadMedia,
        },
        {
          title: "download followings",
          description: "Download all followings to database",
          value: CmdAction.DownloadFollowings,
        },
        {
          title: "download user timeline",
          description: "Download a specific user timeline",
          value: CmdAction.DownloadUserTimeline,
        },
      ],
    },
    {
      type: prev => (prev === CmdAction.DownloadUserTimeline ? "text" : null),
      name: "userIdForTimeline",
      message: "Enter the user id for fetching timeline",
    },
  ]);

  switch (resp.cmd) {
    case CmdAction.DownloadTweets:
      return downloadTweets({});
    case CmdAction.DownloadMedia:
      return downloadAllMedia();
    case CmdAction.DownloadFollowings:
      return downloadFollowings();
    case CmdAction.DownloadUserTimeline:
      const id = resp.userIdForTimeline;
      if (!id) throw Error("Missing user id");
      return downloadTweets({ id, ignoreDuplicate: true });
    default:
      throw Error("Invalid command");
  }
};

main();
