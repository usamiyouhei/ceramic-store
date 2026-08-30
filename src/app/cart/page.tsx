"use client";
import React from "react";
import styles from "./page.module.scss";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItems = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  return <main className={styles.main}></main>;
}
