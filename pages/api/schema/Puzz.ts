import { objectType } from "@nexus/schema";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const Puzz = objectType({
  name: "Puzz",
  definition(t) {
    t.int("id");
    t.string("eng");
    t.string("kor");
    t.int("puzzleLevel", {
      nullable: true,
    });
    t.int("puzzleSize", {
      nullable: true,
    });
    t.string("setDate");
    t.list.field("folders", {
      type: "Folder",
      resolve: (parent) =>
        prisma.puzz
          .findOne({
            where: { id: Number(parent.id) },
          })
          .user(),
    });
    t.list.field("notes", {
      type: "Note",
      resolve: (parent) =>
        prisma.puzz
          .findOne({
            where: { id: Number(parent.id) },
          })
          .notes(),
    });
    t.int("author");
    t.list.field("hints", {
      type: "Hint",
      resolve: (parent) =>
        prisma.puzz
          .findOne({
            where: { id: Number(parent.id) },
          })
          .hints(),
    });
  },
});
