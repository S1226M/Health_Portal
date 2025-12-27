import "dotenv/config";
import { defineConfig } from "@prisma/config";

// Keep the config minimal: Prisma CLI will read `DATABASE_URL` from the
// environment at runtime. Avoid putting the URL here so the runtime client
// doesn't require an adapter option.
export default defineConfig({
  schema: "prisma/schema.prisma",
});
