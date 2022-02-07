import prompts from "prompts";
import { Action, runActions } from "./actions/action";
import { downloadAllMedia } from "./actions/downloadAllMedia";
import { downloadFollowings } from "./actions/downloadFollowings";
import { makeDownloadTweetsAction } from "./actions/downloadTweets";
import { monitoredUserIds } from "./config";

enum CmdAction {
  DownloadTweets,
  DownloadMedia,
  DownloadFollowings,
  DownloadUserTimeline,
  DownloadMonitoredTimeline,
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
          title: "download specific user timeline",
          description: "Download a specific user timeline",
          value: CmdAction.DownloadUserTimeline,
        },
        {
          title: "download monitored user timeline",
          description: "Download all monitored user timeline",
          value: CmdAction.DownloadMonitoredTimeline,
        },
      ],
    },
    {
      type: prev => (prev === CmdAction.DownloadUserTimeline ? "text" : null),
      name: "userIdForTimeline",
      message: "Enter the user id for fetching timeline",
    },
  ]);

  const transformActions = (): Action[] => {
    switch (resp.cmd) {
      case CmdAction.DownloadTweets:
        return [makeDownloadTweetsAction({})];
      case CmdAction.DownloadMedia:
        return [downloadAllMedia];
      case CmdAction.DownloadFollowings:
        return [downloadFollowings];
      case CmdAction.DownloadUserTimeline:
        const id = resp.userIdForTimeline;
        if (!id) throw Error("Missing user id");
        return [makeDownloadTweetsAction({ id, ignoreDuplicate: true })];
      case CmdAction.DownloadMonitoredTimeline:
        return monitoredUserIds.map(id => makeDownloadTweetsAction({ id, ignoreDuplicate: true }));
      default:
        throw Error("Invalid command");
    }
  };

  runActions(transformActions());
};

main();
