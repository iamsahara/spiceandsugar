
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    return NextResponse.json({ success: true, message: 'Connected to PostgreSQL!' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}