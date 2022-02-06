import { PrismaClient } from "@prisma/client";
import { MediaEntityV1, TweetV1 } from "twitter-api-v2";

export const createTweet = async (prisma: PrismaClient, tweet: TweetV1) => {
  const sourceTweet = tweet.retweeted_status ?? tweet;

  const mediaToData = (media: MediaEntityV1[]) =>
    media.map(media => ({
      where: { id: media.id_str },
      create: {
        id: media.id_str,
        url:
          media.type === "photo" || media.type === "animated_gif"
            ? media.media_url_https
            : media.video_info?.variants.sort((a, b) => (b.bitrate ?? 0) - (a.bitrate ?? 0)).at(0)
                ?.url ?? media.media_url_https,
      },
    }));

  return prisma.tweet.create({
    data: {
      id: sourceTweet.id_str,
      text: sourceTweet?.full_text ?? sourceTweet?.text,
      user: {
        connectOrCreate: {
          where: { id: sourceTweet.user.id_str },
          create: {
            id: sourceTweet.user.id_str,
            name: sourceTweet.user.name,
          },
        },
      },
      media: {
        connectOrCreate: [
          ...mediaToData(sourceTweet.extended_entities?.media ?? []),
          ...mediaToData(tweet.extended_entities?.media ?? []),
          ...mediaToData(sourceTweet.entities.media ?? []),
          ...mediaToData(tweet.entities.media ?? []),
        ],
      },
    },
  });
};
