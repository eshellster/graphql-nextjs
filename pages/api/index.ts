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
// import { resolve } from "dns";
import * as allTypes from "./schema";

export const GQLDate = asNexusMethod(GraphQLDate, "date");

const prisma = new PrismaClient();

export const schema = makeSchema({
  types: allTypes,
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
