import { objectType } from "@nexus/schema";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const Profile = objectType({
  name: "Profile",
  definition(t) {
    t.int("id");
    t.string("bio", {
      nullable: true,
    });
    t.field("user", {
      type: "User",
      resolve: (parent) =>
        prisma.profile
          .findOne({
            where: { id: Number(parent.id) },
          })
          .user(),
    });
  },
});
