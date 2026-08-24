import { products } from "@/data/products";
import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import React from "react";
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
  return <main className={styles.main}></main>;
}
