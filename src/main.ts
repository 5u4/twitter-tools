import prompts from "prompts";
import { downloadAllMedia } from "./cmd/downloadAllMedia";
import { seed } from "./cmd/seed";

enum CmdAction {
  Seed,
  Download,
}

const main = async () => {
  const resp = await prompts([
    {
      type: "select",
      name: "cmd",
      message: "Select your command action",
      choices: [
        { title: "seed", description: "Seed an fresh empty database", value: CmdAction.Seed },
        {
          title: "download",
          description: "Download all media data to resource folder",
          value: CmdAction.Download,
        },
      ],
    },
  ]);

  switch (resp.cmd) {
    case CmdAction.Seed:
      return seed();
    case CmdAction.Download:
      return downloadAllMedia();
    default:
      throw Error("Invalid command");
  }
};

main();
