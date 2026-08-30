"use client";
import React, { useState } from "react";
import styles from "./ProductOptions.module.scss";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";

type ProductOptionsProps = {
  // sizes: string[];
  // colors: string[];
  // inStock: boolean;
  product: Product;
};

export default function ProductOptions({
  // sizes,
  // colors,
  // inStock,
  product,
}: ProductOptionsProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const decreaseQuantity = () => {
    setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
  };

  const increaseQuantity = () => {
    setQuantity((currentQuantity) => currentQuantity + 1);
  };

  const handleAddToCart = () => {
    const cartItemId = [product.id, selectedSize, selectedColor].join("-");

    addItem({
      cartItemId,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };
  return (
    <div className={styles.options}>
      <div className={styles.optionGroup}>
        <h2 className={styles.title}>Size</h2>

        <div className={styles.optionList}>
          {product.sizes.map((size) => (
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
          {product.colors.map((color) => (
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

      <div className={styles.optionGroup}>
        <h2 className={styles.title}>Quantity</h2>

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
        disabled={!product.inStock}
        onClick={handleAddToCart}
      >
        {!product.inStock ? "Sold out" : isAdded ? "added!" : "Add to cart"}
        {/* {inStock ? "Add to cart" : "Sold out"} */}
      </button>
    </div>
  );
}
