import { objectType } from "@nexus/schema";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const User = objectType({
  name: "User",
  definition(t) {
    t.int("id");
    t.string("name", {
      nullable: true,
    });
    t.string("email");
    t.list.field("posts", {
      type: "Post",
      resolve: (parent) =>
        prisma.user
          .findOne({
            where: { id: Number(parent.id) },
          })
          .posts(),
    });
    t.field("profile", {
      type: "Profile",
      nullable: true,
      resolve: (parent) =>
        prisma.user.findOne({ where: { id: Number(parent.id) } }).profile(),
    });
    t.list.field("userPuzzes", {
      type: "Puzz",
      resolve: (parent) =>
        prisma.user
          .findOne({
            where: { id: Number(parent.id) },
          })
          .userPuzzes(),
    });
    t.list.field("groups", {
      type: "Group",
      resolve: (parent) =>
        prisma.user
          .findOne({
            where: { id: Number(parent.id) },
          })
          .groups(),
    });
  },
});
