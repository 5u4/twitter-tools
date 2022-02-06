import "dotenv/config";
import { TwitterApiTokens } from "twitter-api-v2";

export const twitterApiTokens: TwitterApiTokens = {
  appKey: process.env.CONSUMER_KEY!,
  appSecret: process.env.CONSUMER_SECRET!,
  accessToken: process.env.ACCESS_KEY!,
  accessSecret: process.env.ACCESS_SECRET!,
};

export const monitoredUserIds: string[] = process.env.MONITORED_USERS?.split(",") ?? [];
