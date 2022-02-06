import prompts from "prompts";
import { downloadAllMedia } from "./cmd/downloadAllMedia";
import { downloadTweets } from "./cmd/downloadTweets";

enum CmdAction {
  DownloadTweets,
  DownloadMedia,
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
      ],
    },
  ]);

  switch (resp.cmd) {
    case CmdAction.DownloadTweets:
      return downloadTweets();
    case CmdAction.DownloadMedia:
      return downloadAllMedia();
    default:
      throw Error("Invalid command");
  }
};

main();
