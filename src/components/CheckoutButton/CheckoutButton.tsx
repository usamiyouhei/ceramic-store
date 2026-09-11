"use client";

import React, { useState } from "react";
import styles from "./CheckoutButton.module.scss";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const items = useCartStore((state) => state.items);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const checkoutItems = items.map((item) => ({
        productId: item.productId,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
      }));

      const response = await fetch("/api/checkout", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          items: checkoutItems,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "決済を開始できませんでした。");
      }

      if (!data.url) {
        throw new Error("Stripeの決済URLを取得できませんでした。");
      }

      window.location.href = data.url;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "エラーが発生しました。";

      setErrorMessage(message);
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.button}
        onClick={handleCheckout}
        disabled={items.length === 0 || isLoading}
      >
        {isLoading ? "Loading..." : "Proceed to checkout"}
      </button>

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
}
