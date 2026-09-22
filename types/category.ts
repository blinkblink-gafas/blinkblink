export type CategoryImage = "sunglasses" | "eyeglasses" | "sports";
export type CategoryBackground = "primary" | "secondary" | "accentBlue";

export interface Category {
  id: string;
  name: string;
  description: string;
  image: CategoryImage;
  slug: string;
  bgColor: CategoryBackground;
}
