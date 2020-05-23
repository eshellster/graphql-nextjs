import { objectType } from "@nexus/schema";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const Folder = objectType({
  name: "Folder",
  definition(t) {
    t.int("id");
    t.string("name");
    t.int("puzzleLevel", {
      nullable: true,
    });
    t.int("puzzleSize", {
      nullable: true,
    });
    t.list.field("notes", {
      type: "Note",
      resolve: (parent) =>
        prisma.folder
          .findOne({
            where: { id: Number(parent.id) },
          })
          .notes(),
    });
    t.list.field("puzzs", {
      type: "Puzz",
      resolve: (parent) =>
        prisma.folder
          .findOne({
            where: { id: Number(parent.id) },
          })
          .puzzs(),
    });
    t.field("parentFolder", {
      type: "Folder",
      nullable: true,
      resolve: (parent) =>
        prisma.folder
          .findOne({
            where: { id: Number(parent.id) },
          })
          .parentFolder(),
    });
    t.list.field("subFolders", {
      type: "Folder",
      resolve: (parent) =>
        prisma.folder
          .findOne({
            where: { id: Number(parent.id) },
          })
          .subFolders(),
    });
  },
});
