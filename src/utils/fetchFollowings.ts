import { UserV1 } from "twitter-api-v2";
import { twitter } from "../twitter/client";

export type FriendListV1 = {
  users: UserV1[];
  previous_cursor: number;
  previous_cursor_str: string;
  next_cursor: number;
  next_cursor_str: string;
};

export type FetchFollowingsPayload = {
  count?: string | undefined;
  cursor?: string | undefined;
  skip_status?: boolean | undefined;
  include_user_entities?: boolean | undefined;
};

export const fetchFollowings = async (payload: FetchFollowingsPayload) => {
  return await twitter.v1.get<FriendListV1>("friends/list.json", payload);
};
