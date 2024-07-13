import { pgTable, primaryKey, text } from "drizzle-orm/pg-core";

export const reproTable = pgTable(
  "repro_table",
  {
    firstColumn: text("first_column").notNull(),
    secondColumn: text("second_column").notNull(),
  },
  (t) => ({
    compositePK: primaryKey({
      name: "pkNameWithUpperCaseChars", // error when uppercase characters are present
      columns: [t.secondColumn, t.firstColumn],
    }),
  })
);
