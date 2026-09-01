"use client";
import React from "react";
import styles from "./page.module.scss";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <Link href="/" className={styles.backLink}>
          ← Continue shopping
        </Link>

        <h1 className={styles.title}>Shopping Cart</h1>

        {items.length === 0 ? (
          <p className={styles.empty}>カートは空です。</p>
        ) : (
          <>
            <div className={styles.itemList}>
              {items.map((item) => (
                <article key={item.cartItemId} className={styles.item}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={160}
                    height={160}
                    className={styles.image}
                  />
                  <div className={styles.content}>
                    <h2>{item.name}</h2>
                    <p>
                      Size: {item.size} / Color: {item.color}
                    </p>

                    <p>￥{item.price.toLocaleString("ja-JP")}</p>

                    <div className={styles.quantity}>
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.cartItemId)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.cartItemId)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => removeItem(item.cartItemId)}
                    ></button>
                  </div>
                  <p className={styles.subTotal}>
                    ￥{(item.price * item.quantity).toLocaleString("ja-JP")}
                  </p>
                </article>
              ))}
            </div>

            <div className={styles.total}>
              <span>Total</span>
              <strong>￥{totalPrice.toLocaleString("ja-JP")}</strong>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
