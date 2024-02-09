import path from "path";

export const __dirname = process.env.NODE_ENV === 'development'
  ? '/app/dist/apps/admin'
  : path.resolve()

