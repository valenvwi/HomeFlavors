import { menuItemsList } from "../../../../api";
import { useEffect, useState } from "react";
import { MenuItemType } from "../../types/menuItem";
import { Button, Container, Typography } from "@mui/material";
import MenuItemCard from "./MenuItemCard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useAppSelector } from "../../store/root";
import AddMenuItem from "./AddMenuItem";

export default function MenuItem() {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [showAddMenuItem, setShowAddMenuItem] = useState<boolean>(false);
  const isKitchenOwner = useAppSelector((state) => state.isKitchenOwner);

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

  const toggleAddMenuItem = () => {
    setShowAddMenuItem(!showAddMenuItem);
    console.log(showAddMenuItem);
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      {isKitchenOwner && (
        <Button
          sx={{ justifyContent: "flex-end", mx: 2 }}
          onClick={toggleAddMenuItem}
        >
          <AddCircleOutlineIcon />{" "}
          <Typography sx={{ mx: 2 }}>Add Menu Item</Typography>
        </Button>
      )}
      {showAddMenuItem ? (
        <AddMenuItem />
      ) : (
        menuItems.map((item) => (
          <MenuItemCard menuItem={item} key={item.name} />
        ))
      )}
    </Container>
  );
}
