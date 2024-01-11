export type MenuItemType = {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string | undefined;
  category: string;
  isAvailable: boolean;
  isVeg: boolean;
  isSpicy: boolean;
  kitchen: number;
};

export type MenuItemStringType = {
  id: number;
  name: string;
  description: string;
  price: string;
  image?: string | undefined;
  category: string;
  isAvailable: boolean;
  isVeg: boolean;
  isSpicy: boolean;
  kitchen: number;
};
