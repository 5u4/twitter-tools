import { prisma } from "../prisma/client";
import { fetchFollowings } from "../utils/fetchFollowings";

export const downloadFollowings = async () => {
  // TODO Pagination
  const followings = await fetchFollowings({ include_user_entities: false, skip_status: true });

  for (const user of followings.users) {
    await prisma.user.upsert({
      where: { id: user.id_str },
      create: { id: user.id_str, name: user.name, following: true },
      update: { following: true },
    });
  }
};
