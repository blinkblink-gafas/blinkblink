import type { Product } from "@/types/product";

export interface CartItem {
  productId: Product["id"];
  name: Product["name"];
  price: number;
  image: string;
  color?: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}
