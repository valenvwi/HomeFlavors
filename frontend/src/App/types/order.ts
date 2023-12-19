import { MenuItemType } from "./menuItem";

export type OrderItemType = {
  id: number;
  menuItem: MenuItemType;
  quantity?: number;
};

export type OrderType = {
  createdAt: string;
  id: number;
  isAccepted: boolean;
  isCancelled: boolean;
  kitchen: number;
  orderItems: OrderItemType[];
  pickUpDate: string;
  pickUpTime: string;
  remark?: string | null;
  totalPrice: string;
  updatedAt: string;
  user: number;
};
