import { objectType } from "@nexus/schema";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const Hint = objectType({
  name: "Hint",
  definition(t) {
    t.int("id");
    t.string("hint");
    t.string("keyWords");
    t.field("puzzs", {
      type: "Puzz",
      resolve: (parent) =>
        prisma.hint
          .findOne({
            where: { id: Number(parent.id) },
          })
          .puzzs(),
    });
  },
});
