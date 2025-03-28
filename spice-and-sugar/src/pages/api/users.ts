import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { name, email, phone } = req.body;

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          phone,
        }
      ])
      .select("*")
      .single();

    if (error) throw error;

    return res.status(201).json({ message: "User saved successfully", user: data });
  } catch (error: any) {
    console.error("❌ Error saving user:", error.message);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}