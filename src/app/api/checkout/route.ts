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
      if (!product) {
        return NextResponse.json(
          { error: "商品が見つかりません。" },
          { status: 400 },
        );
      }

      if (!product.inStock) {
        return NextResponse.json(
          { error: `${product.name}は在庫切れです。` },
          { status: 400 },
        );
      }

      if (!product.sizes.includes(item.size)) {
        return NextResponse.json(
          { error: "選択されたサイズは存在しません。" },
          { status: 400 },
        );
      }

      if (!product.colors.includes(item.color)) {
        return NextResponse.json(
          { error: "選択されたカラーは存在しません" },
          { status: 400 },
        );
      }

      if (
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 99
      ) {
        return NextResponse.json(
          { error: "数量が正しくありません。" },
          { status: 400 },
        );
      }
    }
  } catch (error) {}
}
