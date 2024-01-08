import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { MenuItemType } from "../../types/menuItem";
import { BASEURL } from "../../../config";
import spicyIcon from "../../../assets/spicy.png";
import vegIcon from "../../../assets/veg.png";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import soldOut from "../../../assets/sold-out.png";
import { useAppDispatch, useAppSelector } from "../../store/root";
import { cartActions } from "../../store/cart";
import Modal from "../../UI/Modal";
import { useNavigate } from "react-router-dom";

export default function MenuItemCard(props: {
  menuItem: MenuItemType;
  isOwner: boolean;
  onSetMenuItem: (menuItem: MenuItemType) => void;
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  onSetMenuItemId: (id: number) => void;
  openDeleteDialog: () => void;

}) {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const dispatch = useAppDispatch();

  const onAddToCart = () => {
    dispatch(cartActions.addToCart(props.menuItem));
  };

  const onDeleteMenuItem = () => {
    props.onSetMenuItemId(props.menuItem.id);
    props.openDeleteDialog();
  };

  const setMenuItem = () => {
    props.onSetMenuItem(props.menuItem);
  };

  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignup = () => {
    navigate("/signup");
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  };

  return (
    <Card
      elevation={6}
      sx={{
        display: "flex",
        my: 2,
        mx: 4,
        p: 2,
        backgroundColor: "#fff6f2",
        borderRadius: "15px",
      }}
    >
      <img
        src={`${BASEURL}/${props.menuItem.image}`}
        alt={props.menuItem.name}
        style={{
          width: "150px",
          height: "150px",
          objectFit: "cover",
          borderRadius: "10px",
          aspectRatio: "1",
        }}
      />
      <Box sx={{ flexGrow: 1, mx: 3, my: 2 }}>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography variant="h6" sx={{ pr: 2, fontWeight: 700 }}>
            {props.menuItem.name}
          </Typography>
          {props.menuItem.isVeg && (
            <img src={vegIcon} alt="Vegetarian icon" width="25" height="25" />
          )}
          {props.menuItem.isSpicy && (
            <img src={spicyIcon} alt="Spicy icon" width="35" height="35" />
          )}
        </Box>
        <Typography variant="body1" sx={{ color: "#8b8989" }}>
          {props.menuItem.description}
        </Typography>
        <Typography variant="h6" fontWeight={700}>
          CHF {props.menuItem.price}
        </Typography>
      </Box>
      {props.isOwner ? (
        <>
          <Button style={{ backgroundColor: "#fff6f2" }} onClick={setMenuItem}>
            <ModeEditIcon sx={{ fontSize: "40px" }} />
          </Button>
          <Button
            style={{ backgroundColor: "#fff6f2", color: "primary" }}
            onClick={onDeleteMenuItem}
          >
            <DeleteIcon sx={{ fontSize: "40px", color: "primary" }} />
          </Button>
        </>
      ) : props.menuItem.isAvailable ? (
        !isLoggedIn ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              color="primary"
              onClick={props.handleOpen}
              sx={{ height: " 60px", width: "60px" }}
            >
              <AddCircleOutlineIcon sx={{ fontSize: "40px" }} />
            </IconButton>
            <Modal
              open={props.open}
              handleClose={props.handleClose}
              icon="none"
              message="Log in to add to cart"
              confirmText="Log in"
              handleConfirm={goToLogin}
              subtext="Don't have an account?"
              subtextButtonText="Sign up"
              subtextAction={goToSignup}
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              color="primary"
              onClick={onAddToCart}
              sx={{ height: " 60px", width: "60px" }}
            >
              <AddCircleOutlineIcon sx={{ fontSize: "40px" }} />
            </IconButton>
          </Box>
        )
      ) : (
        <img
          src={soldOut}
          alt="Sold Out"
          width="100"
          height="100"
          style={{ margin: "auto" }}
        />
      )}
    </Card>
  );
}
