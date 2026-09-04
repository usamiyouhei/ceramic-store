import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error("STRIPE_SECRET_KEYが設定されていません。");
}

export const stripe = new Stripe(secretKey);
