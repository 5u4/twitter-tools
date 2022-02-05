import TwitterClient from "twitter-api-v2";
import { twitterApiTokens } from "../config";

export const twitter = new TwitterClient(twitterApiTokens);
