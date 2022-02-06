import { prisma } from "../prisma/client";
import { fetchFollowings } from "../utils/fetchFollowings";

export const downloadFollowings = async () => {
  // TODO Pagination
  const followings = await fetchFollowings({ include_user_entities: false, skip_status: true });
  const followingIds = followings.users.map(user => user.id_str);

  const dbUsers = await prisma.user.findMany({
    select: { id: true },
    where: { id: { in: followingIds } },
  });
  const dbUserSet = new Set(dbUsers.map(({ id }) => id));

  const dbFollowings = await prisma.following.findMany({
    select: { id: true },
    where: { id: { in: followingIds } },
  });
  const dbFollowingSet = new Set(dbFollowings.map(({ id }) => id));

  for (const user of followings.users) {
    if (!dbFollowingSet.has(user.id_str))
      await prisma.following.create({ data: { id: user.id_str } });

    if (!dbUserSet.has(user.id_str))
      await prisma.user.create({ data: { id: user.id_str, name: user.name } });
  }
};
