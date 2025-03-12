import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { user_name, phone, email, cakeType, shape, levels, color, weight, filling, toppings, customText, price, image_url } = body;
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
        image_url
      }
    ]);

    if (error) {
      return NextResponse.json({ message: "Error saving order", error }, { status: 500 });
    }

    return NextResponse.json({ message: "Order saved successfully!", data }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
  }
}