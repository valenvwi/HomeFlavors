import { menuItemsList } from "../../../../api";
import { useEffect, useState } from "react";
import { MenuItemType } from "../../types/menuItem";
import { Container } from "@mui/material";
import MenuItemCard from "./MenuItemCard";

export default function MenuItem() {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const getMenuItem = async () => {
    const response = await menuItemsList();
    if (!response) {
      console.log("error");
      return;
    }
    setMenuItems(response.data);
  };

  useEffect(() => {
    getMenuItem();
  }, []);

  return (
    <Container>
      {menuItems.map((item) => (
        <MenuItemCard menuItem={item} key={item.name} />
      ))}
    </Container>
  );
}
