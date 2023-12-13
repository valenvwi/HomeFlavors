import { useKitchensRetrieve, useMenuItemsList } from "../../../../api";
import { useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import MenuItemCard from "./MenuItemCard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useAppSelector } from "../../store/root";
import AddMenuItem from "./AddMenuItem";

export default function MenuItem() {
  const [showAddMenuItem, setShowAddMenuItem] = useState<boolean>(false);
  const currentUserId = useAppSelector((state) => state.currentUserId);

  const { data: kitchenResponse } = useKitchensRetrieve(1);
  const kitchen = kitchenResponse?.data;
  const isKitchenOwner = kitchen?.owner === currentUserId;

  const { data: menuItemsResponse } = useMenuItemsList();
  const menuItems = menuItemsResponse?.data;

  const toggleAddMenuItem = () => {
    setShowAddMenuItem(!showAddMenuItem);
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
        menuItems?.map((item) => (
          <MenuItemCard menuItem={item} key={item.name} isOwner={isKitchenOwner} />
        ))
      )}
    </Container>
  );
}
