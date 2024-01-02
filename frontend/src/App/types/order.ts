import { MenuItemType } from "./menuItem";

export type OrderItemType = {
  id: number;
  menuItem: MenuItemType;
  quantity: number;
};

export type OrderType = {
  createdAt: string;
  id: number;
  isAccepted?: boolean;
  isCancelled?: boolean;
  name?: string | null;
  contactNumber: string;
  kitchen: number;
  pickUpDate: string;
  pickUpTime: string;
  remark?: string | null;
  totalPrice: string;
  updatedAt: string;
  user: number;
  orderItems: OrderItemType[];
};
