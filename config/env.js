import dotenv from 'dotenv';
dotenv.config(); // ✅ ensures .env is loaded before validation

import { z } from 'zod';

export const env = z
  .object({
    PORT: z.coerce.number().default(3000),
    MONGODB_URI: z.string(),
    MONGODB_DATABASE_NAME: z.string(),
  })
  .parse(process.env);
