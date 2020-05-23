import {
  makeSchema,
  objectType,
  stringArg,
  asNexusMethod,
} from "@nexus/schema";
import { GraphQLDate } from "graphql-iso-date";
import { PrismaClient } from "@prisma/client";
import { graphql } from "graphql";
import path from "path";
import { resolve } from "dns";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import { User } from "./schema/User";
import { Query } from "./schema/Query";
import { Mutation } from "./schema/Mutation";

export const GQLDate = asNexusMethod(GraphQLDate, "date");

const prisma = new PrismaClient();

const Folder = objectType({
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

const Group = objectType({
  name: "Group",
  definition(t) {
    t.int("id");
    t.string("name");
    t.list.field("users", {
      type: "User",
      resolve: (parent) =>
        prisma.group
          .findOne({
            where: { id: Number(parent.id) },
          })
          .users(),
    });
  },
});

const Hint = objectType({
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

const Note = objectType({
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
const Profile = objectType({
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
const Puzz = objectType({
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

const Post = objectType({
  name: "Post",
  definition(t) {
    t.int("id");
    t.string("title");
    t.string("content", {
      nullable: true,
    });
    t.boolean("published");
    t.field("author", {
      type: "User",
      nullable: true,
      resolve: (parent) =>
        prisma.post
          .findOne({
            where: { id: Number(parent.id) },
          })
          .author(),
    });
  },
});

export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    Post,
    User,
    Folder,
    Group,
    Hint,
    Note,
    Profile,
    Puzz,
    GQLDate,
  ],
  outputs: {
    typegen: path.join(process.cwd(), "pages", "api", "nexus-typegen.ts"),
    schema: path.join(process.cwd(), "pages", "api", "schema.graphql"),
  },
});

export default async (req, res) => {
  const query = req.body.query;
  const variables = req.body.variables;
  const response = await graphql(schema, query, {}, {}, variables);
  return res.end(JSON.stringify(response));
};
