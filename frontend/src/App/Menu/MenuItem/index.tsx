import { menuItemsDestroy, useMenuItemsList } from "../../../../api";
import { useState } from "react";
import {
  Box,
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
import { useAppDispatch, useAppSelector } from "../../store/root";
import AddMenuItem from "./AddMenuItem";
import EditMenuItem from "./EditMenuItem";
import { MenuItemType } from "../../types/menuItem";
import Tabbar from "./CategoryNavBar/Tabbar";
import Selectionbar from "./CategoryNavBar/Selectionbar";
import { keepPreviousData } from "@tanstack/react-query";
import Modal from "../../UI/Modal";
import { modalActions } from "../../store/modal";

export default function MenuItem() {
  const [showAddMenuItem, setShowAddMenuItem] = useState<boolean>(false);
  const [showEditMenuItem, setShowEditMenuItem] = useState<boolean>(false);
  const isOwner = useAppSelector((state) => state.auth.isOwner);
  const [menuItem, setMenuItem] = useState<MenuItemType | null>(null);
  const [category, setCategory] = useState<string>("soup");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [menuItemId, setMenuItemId] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessDeleteModal, setShowSuccessDeleteModal] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [showFailDeleteModal, setShowFailDeleteModal] = useState(false);
  const isCreatedMenuItem = useAppSelector(
    (state) => state.modal.isCreatedMenuItem
  );
  const isEditedMenuItem = useAppSelector(
    (state) => state.modal.isEditedMenuItem
  );

  const dispatch = useAppDispatch();

  const { data: menuItemsResponse, refetch: refetchMenuItems } =
    useMenuItemsList(
      { category: category },
      { query: { placeholderData: keepPreviousData } }
    );
  const menuItems = menuItemsResponse?.data;

  const toggleAddMenuItem = () => {
    setShowAddMenuItem(!showAddMenuItem);
  };

  const onSetMenuItemId = (id: number) => {
    setMenuItemId(id);
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
    setIsEntering(true);
    setTimeout(() => {
      setIsEntering(false);
    }, 200);
  };

  const openDeleteDialog = () => {
    setShowDeleteModal(true);
  };

  const deleteMenuItem = async (id: number) => {
    try {
      await menuItemsDestroy(id);
      setShowDeleteModal(false);
      setShowSuccessDeleteModal(true);
      setMenuItemId(0);
      refetchMenuItems();
    } catch (error) {
      setShowFailDeleteModal(true);
      return;
    }
  };

  const closeDialog = () => {
    setShowDeleteModal(false);
    setShowSuccessDeleteModal(false);
    setShowFailDeleteModal(false);
    dispatch(modalActions.setIsCreatedMenuItem(false));
    dispatch(modalActions.setIsEditedMenuItem(false));
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column", mt: 3, mb: 5 }}>
      {/* All Modals */}
      {showDeleteModal && (
        <Modal
          open={showDeleteModal}
          message="Are you sure you want to delete this item?"
          confirmText="Yes"
          cancelText="No"
          handleConfirm={() => deleteMenuItem(menuItemId)}
          handleClose={closeDialog}
          icon="alert"
        />
      )}

      {showSuccessDeleteModal && (
        <Modal
          open={showSuccessDeleteModal}
          message="You have successfully deleted this item"
          cancelText="Close"
          handleClose={closeDialog}
          icon="success"
        />
      )}

      {showFailDeleteModal && (
        <Modal
          open={showFailDeleteModal}
          message="You are not allowed to delete my items!"
          cancelText="Close"
          handleClose={closeDialog}
          icon="fail"
        />
      )}

      {isCreatedMenuItem && (
        <Modal
          open={isCreatedMenuItem}
          message="You have successfully created this item"
          cancelText="Close"
          handleClose={closeDialog}
          icon="success"
        />
      )}

      {isEditedMenuItem && (
        <Modal
          open={isEditedMenuItem}
          message="You have successfully edited this item"
          cancelText="Close"
          handleClose={closeDialog}
          icon="success"
        />
      )}

      {isOwner && !showEditMenuItem && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={toggleAddMenuItem}>
            <AddCircleOutlineIcon />{" "}
            <Typography variant="subtitle2" sx={{ mx: 2 }}>
              Add Menu Item
            </Typography>
          </Button>
        </Box>
      )}

      {/* Add menu item section for owner */}
      {showAddMenuItem && (
        <AddMenuItem ontoggleAddMenuItem={toggleAddMenuItem} />
      )}

      {/* Edit menu item section for owner */}
      {showEditMenuItem && (
        <EditMenuItem
          menuItem={menuItem}
          onCancelEdit={onCancelEdit}
          category={category}
        />
      )}

      {/* Menu item section for all*/}

      {/* Navigation bar to select category */}
      {!showAddMenuItem && !showEditMenuItem && (
        <>
          {isSmallScreen ? (
            <Selectionbar handleCategoryChange={handleCategoryChange} />
          ) : (
            <Tabbar handleCategoryChange={handleCategoryChange} />
          )}

          <Grid container>
            {menuItems &&
              menuItems.map((item) => (
                <Grid item xs={12} sm={6} md={3}>
                  <MenuItemCard
                    menuItem={item}
                    key={item.id}
                    isOwner={isOwner}
                    onSetMenuItem={onSetMenuItem}
                    open={open}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    onSetMenuItemId={onSetMenuItemId}
                    openDeleteDialog={openDeleteDialog}
                    isEntering={isEntering}
                  />
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </Container>
  );
}
