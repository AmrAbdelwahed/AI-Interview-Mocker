import { defineConfig } from "drizzle-kit";

export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_oL3A5veSskbR@ep-morning-frog-a501qtxu-pooler.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require'
  }
};