import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  // eslint-disable-next-line no-console
  console.error(
    "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY."
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
    const body = req.body as Record<string, unknown>;
    const {
      user_name,
      phone,
      email,
      cakeType,
      shape,
      levels,
      color,
      weight,
      filling,
      toppings,
      customText,
      price,
      image_url,
      extraDescription,
    } = body;

    const { data, error } = await supabase.from("orders").insert([
      {
        user_name,
        phone,
        email,
        cake_type: cakeType,
        shape,
        levels,
        color,
        weight,
        filling,
        toppings,
        custom_text: customText,
        price,
        image_url,
        extra_description: extraDescription,
      },
    ]);

    if (error) {
      return res.status(500).json({ message: "Error saving order", error });
    }

    return res
      .status(201)
      .json({ message: "Order saved successfully!", data });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}
