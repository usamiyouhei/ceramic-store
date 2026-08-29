"use client";
import { useCartStore } from "@/store/cartStore";
import { useEffect } from "react";

export default function CartHydration() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return null;
}
