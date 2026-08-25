import { products } from "@/data/products";
import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import React from "react";
import Link from "next/link";
import Image from "next/image";
type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = products.find((product) => product.id === id);

  if (!product) {
    notFound();
  }
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <Link href="/" className={styles.backLink}>
          ← Back to products
        </Link>

        <div className={styles.product}>
          <div className={styles.imageWrapper}>
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              priority
            />
          </div>
          <div className={styles.content}>
            <div className={styles.label}>Ceramic Collection</div>
            <h1 className={styles.name}>{product.name}</h1>
            <p className={styles.price}>
              ￥{product.price.toLocaleString("ja-JP")}
            </p>

            <p className={styles.description}>{product.description}</p>

            <div className={styles.option}>
              <h2>Size</h2>

              <div className={styles.optionList}>
                {product.sizes.map((size) => (
                  <span key={size} className={styles.optionItem}>
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.option}>
              <h2>Color</h2>

              <div className={styles.optionList}>
                {product.colors.map((color) => (
                  <span key={color} className={styles.optionItem}>
                    {color}
                  </span>
                ))}
              </div>
            </div>
            <button
              type="button"
              className={styles.cartButton}
              disabled={!product.inStock}
            >
              {product.inStock ? "Add to cart" : "Sold out"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}
