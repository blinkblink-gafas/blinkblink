export type CategoryImage = "men" | "women" | "classic";
export type CategoryBackground = "primary" | "secondary" | "accentBlue";

export interface Category {
  id: string;
  name: string;
  description: string;
  image: CategoryImage;
  slug: string;
  bgColor: CategoryBackground;
}
