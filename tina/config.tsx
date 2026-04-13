import { defineConfig } from "tinacms";

import Global from "./collection/global";
import Page from "./collection/page";
import Event from "./collection/event";

const config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  branch:
    process.env.GITHUB_BRANCH! || // custom branch env override
    process.env.VERCEL_GIT_COMMIT_REF! || // Vercel branch env
    process.env.HEAD! || // Netlify branch env
    "main",
  token: process.env.TINA_TOKEN!,
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  schema: {
    collections: [
      Page, 
      Global,
      Event,
    ],
  },
});

export default config;
