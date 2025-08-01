// test-env.js
import dotenv from 'dotenv';
dotenv.config();

console.log("✅ MONGODB_URI:", process.env.MONGODB_URI);
console.log("✅ MONGODB_DATABASE_NAME:", process.env.MONGODB_DATABASE_NAME);
