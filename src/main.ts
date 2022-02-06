import prompts from "prompts";
import { downloadAllMedia } from "./cmd/downloadAllMedia";
import { downloadFollowings } from "./cmd/downloadFollowings";
import { downloadTweets } from "./cmd/downloadTweets";

enum CmdAction {
  DownloadTweets,
  DownloadMedia,
  DownloadFollowings,
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
      ],
    },
  ]);

  switch (resp.cmd) {
    case CmdAction.DownloadTweets:
      return downloadTweets();
    case CmdAction.DownloadMedia:
      return downloadAllMedia();
    case CmdAction.DownloadFollowings:
      return downloadFollowings();
    default:
      throw Error("Invalid command");
  }
};

main();
