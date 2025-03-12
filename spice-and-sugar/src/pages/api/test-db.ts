
import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    const result = await pool.query('SELECT NOW()');

    res.status(200).json({
      message: "Database connection successful!",
      currentTime: result.rows[0].now,
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      message: "Database connection failed.",
      error: (error as Error).message,
    });
  }
}