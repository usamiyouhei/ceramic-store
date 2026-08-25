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
          </div>
        </div>
      </div>
    </main>
  );
}
