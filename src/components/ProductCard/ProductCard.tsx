import React from "react";
import styles from "./ProductCard.module.scss";
import { Product } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
import ProductOptions from "../ProductOptions/ProductOptions";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className={styles.card}>
      <Link href={`/products/${product.id}`}>
        <div className={styles.imageWrapper}>
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className={styles.image}
          />
          {!product.inStock && <span className={styles.soldOut}>Sold out</span>}
        </div>

        <div className={styles.content}>
          <h2 className={styles.name}>{product.name}</h2>

          <p className={styles.description}>{product.description}</p>

          <p className={styles.price}>
            ￥{product.price.toLocaleString("ja-JP")}
          </p>
        </div>
      </Link>
    </article>
  );
}
