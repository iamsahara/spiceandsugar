// import { NextApiRequest, NextApiResponse } from "next";
// import supabase from "../../lib/supabase";


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   try {
//     console.log("📥 Received order request:", req.body);

//     const {
//       cakeType,
//       shape,
//       levels,
//       color,
//       weight,
//       filling,
//       toppings,
//       customText,
//       price,
//       imageUrl,
//       extraDescription,
//     } = req.body;

//     if (!cakeType || !shape || !levels || !color || !weight || !price) {
//       console.error("❌ Missing required fields:", { cakeType, shape, levels, color, weight, price });
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const { data, error } = await supabase
//       .from("orders")
//       .insert([
//         {
//           cake_type: cakeType,
//           shape,
//           levels,
//           color,
//           weight,
//           filling,
//           toppings,
//           custom_text: customText,
//           total_price: price,
//           image_url: imageUrl,
//           extra_notes: extraDescription,
//         },
//       ])
//       .select()
//       .single();

//     if (error) {
//       console.error("❌ Database Insert Error:", error);
//       return res.status(500).json({ message: "Failed to insert order into database", error });
//     }
//     console.log("✅ Order saved successfully:", data);
//     return res.status(201).json({ message: "Order submitted successfully", order: data });

//   } catch (error) {
//     console.error("❌ Server Error:", error);
//     return res.status(500).json({ message: "Internal Server Error", error });
//   }
// }
import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// simple HTML escape to prevent broken markup if users type "<"
const esc = (v: unknown) =>
  String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
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
      // optionally include customer info if you have it:
      customerName,
      customerEmail,
      customerPhone,
      pickupDate,
    } = req.body || {};

    // Minimal validation – tweak as needed
    if (!cakeType || !shape || !levels || !color || !weight || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const createdAt = new Date().toLocaleString();

    const html = `
      <h2>🎂 New Cake Order</h2>
      <p><strong>Received:</strong> ${esc(createdAt)}</p>

      <h3>Order Summary</h3>
      <table cellpadding="6" style="border-collapse:collapse;background:#fafafa;border-radius:8px">
        <tr><td><strong>Cake Type</strong></td><td>${esc(cakeType)}</td></tr>
        <tr><td><strong>Shape</strong></td><td>${esc(shape)}</td></tr>
        <tr><td><strong>Levels</strong></td><td>${esc(levels)}</td></tr>
        <tr><td><strong>Color</strong></td><td>${esc(color)}</td></tr>
        <tr><td><strong>Weight</strong></td><td>${esc(weight)}</td></tr>
        ${filling ? `<tr><td><strong>Filling</strong></td><td>${esc(filling)}</td></tr>` : ""}
        ${toppings ? `<tr><td><strong>Toppings</strong></td><td>${esc(Array.isArray(toppings) ? toppings.join(", ") : toppings)}</td></tr>` : ""}
        ${customText ? `<tr><td><strong>Custom Text</strong></td><td>${esc(customText)}</td></tr>` : ""}
        <tr><td><strong>Total Price</strong></td><td>${esc(price)}</td></tr>
        ${pickupDate ? `<tr><td><strong>Pickup Date</strong></td><td>${esc(pickupDate)}</td></tr>` : ""}
        ${imageUrl ? `<tr><td><strong>Reference Image</strong></td><td><a href="${esc(imageUrl)}">Open</a></td></tr>` : ""}
        ${extraDescription ? `<tr><td valign="top"><strong>Extra Notes</strong></td><td>${esc(extraDescription)}</td></tr>` : ""}
      </table>

      ${
        customerName || customerEmail || customerPhone
          ? `<h3 style="margin-top:16px">Customer</h3>
             <table cellpadding="6" style="border-collapse:collapse;background:#fafafa;border-radius:8px">
               ${customerName ? `<tr><td><strong>Name</strong></td><td>${esc(customerName)}</td></tr>` : ""}
               ${customerEmail ? `<tr><td><strong>Email</strong></td><td>${esc(customerEmail)}</td></tr>` : ""}
               ${customerPhone ? `<tr><td><strong>Phone</strong></td><td>${esc(customerPhone)}</td></tr>` : ""}
             </table>`
          : ""
      }

      <p style="margin-top:10px;font-size:12px;color:#666">Auto-generated by your site.</p>
    `;

    const text =
      `New Cake Order\n` +
      `Received: ${createdAt}\n` +
      `Cake Type: ${cakeType}\n` +
      `Shape: ${shape}\n` +
      `Levels: ${levels}\n` +
      `Color: ${color}\n` +
      `Weight: ${weight}\n` +
      (filling ? `Filling: ${Array.isArray(filling) ? filling.join(", ") : filling}\n` : "") +
      (toppings ? `Toppings: ${Array.isArray(toppings) ? toppings.join(", ") : toppings}\n` : "") +
      (customText ? `Custom Text: ${customText}\n` : "") +
      `Total Price: ${price}\n` +
      (pickupDate ? `Pickup Date: ${pickupDate}\n` : "") +
      (imageUrl ? `Image: ${imageUrl}\n` : "") +
      (extraDescription ? `Extra Notes: ${extraDescription}\n` : "") +
      (customerName ? `Customer Name: ${customerName}\n` : "") +
      (customerEmail ? `Customer Email: ${customerEmail}\n` : "") +
      (customerPhone ? `Customer Phone: ${customerPhone}\n` : "");

    // Send to YOU (admin inbox)
    const sendResult = await resend.emails.send({
      from: process.env.FROM_EMAIL!,        // e.g. orders@yourdomain.com
      to: process.env.ADMIN_TO_EMAIL!,      // e.g. you@yourdomain.com
      subject: "✅ New Cake Order Received",
      html,
      text,
    });

    // Optionally: if you want to email the customer a copy/receipt when they provided an email:
    // if (customerEmail) {
    //   await resend.emails.send({
    //     from: process.env.FROM_EMAIL!,
    //     to: customerEmail,
    //     subject: "Your cake order was received 🎂",
    //     html: "<p>Thanks! We’ve received your order. We’ll be in touch shortly.</p>",
    //     text: "Thanks! We’ve received your order. We’ll be in touch shortly.",
    //   });
    // }

    // If Resend returned an error, handle it
    if (sendResult.error) {
      console.error("Email send error:", sendResult.error);
      return res.status(500).json({ message: "Failed to send email" });
    }

    return res.status(201).json({ message: "Order submitted successfully" });
  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
