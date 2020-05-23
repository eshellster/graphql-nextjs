# Migration `20200521190926-rename`

This migration has been generated by eshell at 5/21/2020, 7:09:26 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Folder" ALTER COLUMN "puzzleLevel" DROP NOT NULL,
ALTER COLUMN "puzzleSize" DROP NOT NULL;

ALTER TABLE "public"."Note" DROP COLUMN "name",
ADD COLUMN "name" text  NOT NULL ,
ALTER COLUMN "puzzleLevel" DROP NOT NULL,
ALTER COLUMN "puzzleSize" DROP NOT NULL;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200521181941-add-post..20200521190926-rename
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 model User {
   id         Int      @default(autoincrement()) @id
@@ -19,10 +19,10 @@
 model Folder {
   id           Int      @default(autoincrement()) @id
   name         String?
-  puzzleLevel  Int
-  puzzleSize   Int
+  puzzleLevel  Int?
+  puzzleSize   Int?
   notes        Note[]
   puzzs        Puzz[]   @relation(references: [id])
   folderId     Int?     @unique
   parentFolder Folder?  @relation("FolderToFolder", fields: [folderId], references: [id])
@@ -43,11 +43,11 @@
 }
 model Note {
   id          Int     @default(autoincrement()) @id
-  name        String?
-  puzzleLevel Int
-  puzzleSize  Int
+  name        String
+  puzzleLevel Int?
+  puzzleSize  Int?
   folderId    Int?
   folder      Folder? @relation(fields: [folderId], references: [id])
   puzzs       Puzz[]  @relation(references: [id])
 }
```

