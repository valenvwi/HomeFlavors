import { useKitchensRetrieve, useMenuItemsList } from "../../../../api";
import { useState } from "react";
import {
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuItemCard from "./MenuItemCard";
import MenuItemCardMobile from "./MenuItemCardMobile";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useAppSelector } from "../../store/root";
import AddMenuItem from "./AddMenuItem";
import EditMenuItem from "./EditMenuItem";
import { MenuItemType } from "../../types/menuItem";
import Tabbar from "./Tabbar";

export default function MenuItem() {
  const [showAddMenuItem, setShowAddMenuItem] = useState<boolean>(false);
  const [showEditMenuItem, setShowEditMenuItem] = useState<boolean>(false);
  const currentUserId = useAppSelector((state) => state.auth.currentUserId);
  const [menuItem, setMenuItem] = useState<MenuItemType | null>(null);
  const [category, setCategory] = useState<string>("soup");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const { data: kitchenResponse } = useKitchensRetrieve(1);
  const kitchen = kitchenResponse?.data;
  const isKitchenOwner = kitchen?.owner === currentUserId;

  const { data: menuItemsResponse } = useMenuItemsList({ category: category });
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
  };

  const handleCategoryChange = (category: string) => {
    setCategory(category);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

      {showEditMenuItem && (
        <EditMenuItem menuItem={menuItem} onCancelEdit={onCancelEdit} />
      )}
      {!showAddMenuItem && !showEditMenuItem && (
        <>
          <Tabbar handleCategoryChange={handleCategoryChange} />
          {menuItems?.map((item) =>
            isSmallScreen ? (
              <MenuItemCard
                menuItem={item}
                key={item.name}
                isOwner={isKitchenOwner}
                onSetMenuItem={onSetMenuItem}
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
              />
            ) : (
              <MenuItemCardMobile
                menuItem={item}
                key={item.name}
                isOwner={isKitchenOwner}
                onSetMenuItem={onSetMenuItem}
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
              />
            )
          )}
        </>
      )}
    </Container>
  );
}
