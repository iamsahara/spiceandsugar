import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../lib/supabase";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Handle the POST logic here
    res.status(200).json({ message: 'User created' })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
  try {
    const { name, email, phone } = req.body;
    console.log("📩 Incoming user data:", { name, email, phone });

    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, phone: phone || null }])
      .select("*")
      .single();

    if (error) {
      console.error("🔥 Supabase insert failed:", error); // <== This will print the real error
      return res.status(500).json({ message: "Insert failed", error });
    }

    console.log("✅ Inserted user:", data);
    return res.status(201).json({ message: "User saved successfully", user: data });
  } catch (error) {
    if (error instanceof Error) {
      console.error("💥 API catch block error:", error.message);
      return res.status(500).json({ message: "Unexpected error", error: error.message });
    }

    console.error("💥 API catch block error:", error);
    return res.status(500).json({ message: "Unexpected error", error: "Unknown error" });
  }
}