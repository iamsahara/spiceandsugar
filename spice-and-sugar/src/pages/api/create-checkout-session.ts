import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  // eslint-disable-next-line no-console
  console.error("Missing STRIPE_SECRET_KEY in environment.");
}

const stripe = new Stripe(stripeSecretKey ?? "", {
  apiVersion: "2023-10-16",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { amount, description } = req.body as {
      amount?: number;
      description?: string;
    };

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount." });
    }

    const host =
      req.headers.origin ||
      `${req.headers["x-forwarded-proto"] ?? "http"}://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Custom Cake Order",
              description: description || "Velora custom cake order",
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${host}/success`,
      cancel_url: `${host}/cancel`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Stripe Checkout error:", error);
    return res.status(500).json({ error: "Failed to create checkout session." });
  }
}
