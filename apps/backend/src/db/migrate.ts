import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync, mkdirSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const dataDir = resolve(__dirname, "../../../../data");
const dbPath = resolve(dataDir, "local.db");
const migrationsFolder = resolve(__dirname, "../../drizzle");

if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

console.log(`Running migrations...`);
console.log(`Database path: ${dbPath}`);
console.log(`Migrations folder: ${migrationsFolder}`);

const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL");

const db = drizzle(sqlite);

try {
  migrate(db, { migrationsFolder });
  console.log("Migrations completed successfully!");
} catch (error) {
  console.error("Migration failed:", error);
  process.exit(1);
} finally {
  sqlite.close();
}
