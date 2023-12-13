import { useKitchensRetrieve, useMenuItemsList } from "../../../../api";
import { useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import MenuItemCard from "./MenuItemCard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useAppSelector } from "../../store/root";
import AddMenuItem from "./AddMenuItem";
import EditMenuItem from "./EditMenuItem";
import { MenuItemType } from "../../types/menuItem";

export default function MenuItem() {
  const [showAddMenuItem, setShowAddMenuItem] = useState<boolean>(false);
  const [showEditMenuItem, setShowEditMenuItem] = useState<boolean>(false);
  const currentUserId = useAppSelector((state) => state.currentUserId);
  const [menuItem, setMenuItem] = useState<MenuItemType | null>(null);

  const { data: kitchenResponse } = useKitchensRetrieve(1);
  const kitchen = kitchenResponse?.data;
  const isKitchenOwner = kitchen?.owner === currentUserId;

  const { data: menuItemsResponse } = useMenuItemsList();
  const menuItems = menuItemsResponse?.data;

  const toggleAddMenuItem = () => {
    setShowAddMenuItem(!showAddMenuItem);
  };

  const onSetMenuItem = (menuItem: MenuItemType) => {
    setMenuItem(menuItem);
    setShowEditMenuItem(true);
  };

  const onCancelEdit = () => {
    setMenuItem(null);
    setShowEditMenuItem(false);
  }

  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      {isKitchenOwner && !showEditMenuItem && (
        <Button
          sx={{ justifyContent: "flex-end", mx: 2 }}
          onClick={toggleAddMenuItem}
        >
          <AddCircleOutlineIcon />{" "}
          <Typography sx={{ mx: 2 }}>Add Menu Item</Typography>
        </Button>
      )}
      {showAddMenuItem && (
        <AddMenuItem ontoggleAddMenuItem={toggleAddMenuItem} />
      )}
      {showEditMenuItem && <EditMenuItem menuItem={menuItem}  onCancelEdit={onCancelEdit}/>}
      {!showAddMenuItem &&
        !showEditMenuItem &&
        menuItems?.map((item) => (
          <MenuItemCard
            menuItem={item}
            key={item.name}
            isOwner={isKitchenOwner}
            onSetMenuItem={onSetMenuItem}
          />
        ))}
    </Container>
  );
}
