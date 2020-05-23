import { objectType } from "@nexus/schema";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const Group = objectType({
  name: "Group",
  definition(t) {
    t.int("id");
    t.string("name");
    t.list.field("users", {
      type: "User",
      resolve: (parent) =>
        prisma.goup
          .findOne({
            where: { id: Number(parent.id) },
          })
          .users(),
    });
  },
});
