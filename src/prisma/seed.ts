import { seed } from "../cmd/seed";
import { prisma } from "../prisma/client";

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
