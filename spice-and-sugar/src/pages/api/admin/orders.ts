import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  // eslint-disable-next-line no-console
  console.error(
    "Missing Supabase admin env vars. Set NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY."
  );
}

const supabase = createClient(supabaseUrl ?? "", serviceRoleKey ?? "");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { data, error } = await supabase.from("orders").select("*");

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const sorted = (data ?? []).sort((a, b) => {
      const aDate = new Date(a?.created_at ?? 0).getTime();
      const bDate = new Date(b?.created_at ?? 0).getTime();
      return bDate - aDate;
    });

    return res.status(200).json({ orders: sorted });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Admin orders error:", error);
    return res.status(500).json({ error: "Failed to fetch orders." });
  }
}
