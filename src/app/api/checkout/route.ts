import { products } from "@/data/products";
import { CheckoutItem } from "@/types/checkout";
import { NextRequest, NextResponse } from "next/server";

type CheckoutRequestBody = {
  items: CheckoutItem[];
};

import React from "react";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CheckoutRequestBody;

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: "カートに商品がありません。" },
        { status: 400 },
      );
    }
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    for (const item of body.items) {
      const product = products.find((product) => product.id === item.productId);
    }
  } catch (error) {}
}
