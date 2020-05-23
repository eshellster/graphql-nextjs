import { objectType } from "@nexus/schema";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const Note = objectType({
  name: "Note",
  definition(t) {
    t.int("id");
    t.string("name");
    t.int("puzzleLevel", {
      nullable: true,
    });
    t.int("puzzleSize", {
      nullable: true,
    });
    t.field("folder", {
      type: "Folder",
      resolve: (parent) =>
        prisma.note
          .findOne({
            where: { id: Number(parent.id) },
          })
          .folder(),
    });
    t.list.field("puzzs", {
      type: "Puzz",
      resolve: (parent) =>
        prisma.note
          .findOne({
            where: { id: Number(parent.id) },
          })
          .puzzs(),
    });
  },
});
