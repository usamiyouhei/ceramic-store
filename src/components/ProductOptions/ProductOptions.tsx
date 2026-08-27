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
      </div>

      <div className={styles.optionGroup}>
        <h2 className={styles.title}>Color</h2>

        <div className={styles.optionList}>
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              className={`${styles.optionButton} ${selectedColor === color ? styles.selected : ""}`}
              onClick={() => setSelectedColor(color)}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.quantity}>
        <h2>Quantity</h2>

        <div className={styles.quantity}>
          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={quantity === 1}
            aria-label="数量を減らす"
          >
            -
          </button>

          <span>{quantity}</span>

          <button
            type="button"
            onClick={increaseQuantity}
            aria-label="数量を増やす"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        className={styles.cartButton}
        disabled={!inStock}
        onClick={handleAddToCart}
      >
        {inStock ? "Add to cart" : "Sold out"}
      </button>
    </div>
  );
}
