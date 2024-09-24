import { Pool } from 'pg';

const db = new Pool({
  connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
});

export default db;
