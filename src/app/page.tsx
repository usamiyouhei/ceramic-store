import Image from "next/image";
import styles from "./page.module.scss";
import React from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { products } from "@/data/products";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Ceramic Store</h1>

      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
