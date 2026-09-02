"use client";
import { useCartStore } from "@/store/cartStore";
import React from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import CartIcon from "../icons/CartIcon";

export default function Header() {
  const items = useCartStore((state) => state.items);

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Ceramic Store
        </Link>

        <nav className={styles.navigation}>
          <Link href="/" className={styles.navLink}>
            Products
          </Link>

          <Link
            href="/cart"
            className={styles.cartLink}
            aria-label={`カートを見る。商品数は${totalQuantity}点です`}
          >
            <CartIcon className={styles.cartIcon} />

            {totalQuantity > 0 && (
              <span className={styles.cartCount}>{totalQuantity}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
