# drizzle-bug-1

Repro for Drizzle Kit CLI using `drizzle-kit` with PostgreSQL.

drizzle-kit: v0.23.0

drizzle-orm: v0.32.0

Node.js: v20.15.0

pnpm: 9.4.0

## Repro steps

1. Ensure the files are present in your local directory

- `src/schema.ts`
- `drizzle.config.ts`
- `.env`
- `package.json`

2. Start a blank PostgreSQL database and make sure it is available to connect with credentials in the `.env` file.

```
cp .env.example .env
# edit .env with your database credentials if needed
```

3. Run the following commands to install dependencies

```sh
npm install
```

4. Run the following push command **twice**. It will error on the second run.

```sh
npx drizzle-kit push
npx drizzle-kit push  # should error
```

## Expected behavior

The Drizzle Kit CLI command should successfully complete every time if no changes to the schema were made.

## Actual behavior

The Drizzle Kit CLI command errors after the first run with an error message similar to the following

```log
> npx drizzle-kit push
drizzle-kit: v0.23.0
drizzle-orm: v0.32.0

No config path provided, using default path
Reading config file '/Users/roger/projects/drizzle-bug-1/drizzle.config.ts'
Using 'pg' driver for database querying
[✓] Pulling schema from database...
error: constraint "pknamewithuppercasechars" of relation "repro_table" does not exist
    at /Users/roger/projects/drizzle-bug-1/node_modules/drizzle-kit/bin.cjs:79476:15
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async Object.query (/Users/roger/projects/drizzle-bug-1/node_modules/drizzle-kit/bin.cjs:121418:26)
    at async pgPush (/Users/roger/projects/drizzle-bug-1/node_modules/drizzle-kit/bin.cjs:124361:13)
    at async _Command.<anonymous> (/Users/roger/projects/drizzle-bug-1/node_modules/drizzle-kit/bin.cjs:131618:7) {
  length: 148,
  severity: 'ERROR',
  code: '42704',
  detail: undefined,
  hint: undefined,
  position: undefined,
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: undefined,
  table: undefined,
  column: undefined,
  dataType: undefined,
  constraint: undefined,
  file: 'tablecmds.c',
  line: '12053',
  routine: 'ATExecDropConstraint'
}
```
