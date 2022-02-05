import ora from "ora";
import { prisma } from "../prisma/client";
import { saveMedia } from "../utils/saveMedia";
import { sleep } from "../utils/sleep";

const take = 10;
const sleepMsPerDownload = 100;

export const downloadAllMedia = async () => {
  let skip = 0;
  let count = 1;
  const total = await prisma.media.count();
  const padSize = total.toString().length;

  const spinner = ora("Start downloading").start();

  while (true) {
    const mediaList = await prisma.media.findMany({
      take,
      skip,
      include: { tweet: { include: { user: { select: { id: true, name: true } } } } },
    });
    if (mediaList.length === 0) break;

    for (const media of mediaList) {
      spinner.text = `Downloading ${count.toString().padStart(padSize, " ")}/${total}: ${
        media.url
      }`;
      const throughNetwork = await saveMedia(media, media.tweet.user);
      if (throughNetwork) await sleep(sleepMsPerDownload);
      count++;
    }

    skip += mediaList.length;
  }

  spinner.succeed("Finish downloading");
};
