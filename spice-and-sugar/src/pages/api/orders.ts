import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    console.log("📥 Received order request:", req.body);

    const {
      cakeType,
      shape,
      levels,
      color,
      weight,
      filling,
      toppings,
      customText,
      price,
      imageUrl,
      extraDescription,
    } = req.body;

    if (!cakeType || !shape || !levels || !color || !weight || !price) {
      console.error("❌ Missing required fields:", { cakeType, shape, levels, color, weight, price });
      return res.status(400).json({ message: "Missing required fields" });
    }

      
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          cake_type: cakeType,
          shape,
          levels,
          color,
          weight,
          filling,
          toppings,
          custom_text: customText,
          total_price: price,
          image_url: imageUrl,
          extra_notes: extraDescription,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("❌ Database Insert Error:", error);
      return res.status(500).json({ message: "Failed to insert order into database", error });
    }

    console.log("✅ Order saved successfully:", data);
    return res.status(201).json({ message: "Order submitted successfully", order: data });

  } catch (error) {
    console.error("❌ Server Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}