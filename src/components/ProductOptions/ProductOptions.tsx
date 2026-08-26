"use client";
import React, { useState } from "react";
import styles from "./ProductOptions.module.scss";

type ProductOptionsProps = {
  sizes: string[];
  colors: string[];
  inStock: boolean;
};

export default function ProductOptions({
  sizes,
  colors,
  inStock,
}: ProductOptionsProps) {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
  };

  const increaseQuantity = () => {
    setQuantity((currentQuantity) => currentQuantity + 1);
  };

  const handleAddToCart = () => {
    console.log({
      size: selectedSize,
      color: selectedColor,
    });
  };
  return (
    <div className={styles.options}>
      <div className={styles.optionGroup}>
        <h2 className={styles.title}>Size</h2>

        <div className={styles.optionList}>
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              className={`${styles.optionButton} ${selectedSize === size ? styles.selected : ""}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        <div className={styles.optionGroup}></div>
      </div>
    </div>
  );
}
