import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "ceramic-plate-01",
    name: "White Ceramic Plate",
    price: 8500,
    image: "/images/nakazono01.jpeg",
    description: "職人の手仕事で仕上げた白磁の器。",
    sizes: ["Small", "Medium", "Large"],
    colors: ["White", "Gray"],
    inStock: true,
  },
  {
    id: "black-ceramic-bowl",
    name: "Black Ceramic Bowl",
    price: 7200,
    image: "/images/oura01.jpeg",
    description: "料理を引き立てるマットな黒のボウル。",
    sizes: ["Small", "Medium"],
    colors: ["Black"],
    inStock: true,
  },
  {
    id: "gold-rim-plate",
    name: "Gold Rim Plate",
    price: 12000,
    image: "/images/segawa01.jpeg",
    description: "金彩を施した特別な日のためのプレート。",
    sizes: ["Medium", "Large"],
    colors: ["White", "Navy"],
    inStock: false,
  },
];
