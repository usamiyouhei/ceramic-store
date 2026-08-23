import Image from "next/image";
import styles from "./page.module.scss";
import React from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { products } from "@/data/products";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <div className={styles.heding}>
          <p className={styles.label}>Our Collection</p>
          <h1>Ceramic Store</h1>
        </div>

        <div className={styles.productGrid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
