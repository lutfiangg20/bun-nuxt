import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event);

  await prisma.user.delete({ where: { id: Number(params.id) } });
  return "Success";
});
