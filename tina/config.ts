import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: '5baf3730-78ad-4df9-99d2-1b4452157afd', // Get this from tina.io
  token: process.env.TINA_TOKEN || '', // Get this from tina.io

  build: {
    outputFolder: "manage",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "static/images/uploads",
      publicFolder: "/images/uploads",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
