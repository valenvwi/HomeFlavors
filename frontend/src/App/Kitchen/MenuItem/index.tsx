import { useMenuItemsList } from "../../../../api";
import { useState } from "react";
import {
  Button,
  Container,
  Grid,
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
import Tabbar from "./CategoryNavBar/Tabbar";
import Selectionbar from "./CategoryNavBar/Selectionbar";
import { keepPreviousData } from "@tanstack/react-query";

export default function MenuItem() {
  const [showAddMenuItem, setShowAddMenuItem] = useState<boolean>(false);
  const [showEditMenuItem, setShowEditMenuItem] = useState<boolean>(false);
  const isOwner = useAppSelector((state) => state.auth.isOwner);
  const [menuItem, setMenuItem] = useState<MenuItemType | null>(null);
  const [category, setCategory] = useState<string>("soup");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { data: menuItemsResponse } = useMenuItemsList(
    { category: category },
    { query: { placeholderData: keepPreviousData } }
  );
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
    <Container sx={{ display: "flex", flexDirection: "column", mt: 4 }}>
      {isOwner && !showEditMenuItem && (
        <Button sx={{ justifyContent: "flex-end" }} onClick={toggleAddMenuItem}>
          <AddCircleOutlineIcon />{" "}
          <Typography variant="subtitle2" sx={{ mx: 2 }}>
            Add Menu Item
          </Typography>
        </Button>
      )}
      {showAddMenuItem && (
        <AddMenuItem ontoggleAddMenuItem={toggleAddMenuItem} />
      )}

      {showEditMenuItem && (
        <EditMenuItem
          menuItem={menuItem}
          onCancelEdit={onCancelEdit}
          category={category}
        />
      )}
      {!showAddMenuItem && !showEditMenuItem && (
        <>
          {isSmallScreen ? (
            <Selectionbar handleCategoryChange={handleCategoryChange} />
          ) : (
            <Tabbar handleCategoryChange={handleCategoryChange} />
          )}
          {menuItems?.map((item) =>
            isSmallScreen ? (
              <MenuItemCardMobile
                menuItem={item}
                key={item.name}
                isOwner={isOwner}
                onSetMenuItem={onSetMenuItem}
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
              />
            ) : (
              <MenuItemCard
                menuItem={item}
                key={item.name}
                isOwner={isOwner}
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
