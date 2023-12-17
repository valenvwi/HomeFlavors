import { Box, Button, Card, Typography } from "@mui/material";
import { MenuItemType } from "../../types/menuItem";
import { BASEURL } from "../../../config";
import spicyIcon from "../../../assets/spicy.jpg";
import vegIcon from "../../../assets/veg.png";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { menuItemsDestroy } from "../../../../api";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import soldOut from "../../../assets/sold-out.png";
import { useAppDispatch, useAppSelector } from "../../store/root";
import { cartActions } from "../../store/cart";
import LoginModal from "../../UI/LoginModal";

export default function MenuItemCard(props: {
  menuItem: MenuItemType;
  isOwner: boolean;
  onSetMenuItem: (menuItem: MenuItemType) => void;
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
}) {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const dispatch = useAppDispatch();

  const onAddToCart = () => {
    dispatch(cartActions.addToCart(props.menuItem));
  };

  const onDeleteMenuItem = () => {
    console.log(props.menuItem.id);
    menuItemsDestroy(props.menuItem.id);
  };

  const setMenuItem = () => {
    props.onSetMenuItem(props.menuItem);
  };

  return (
    <Card sx={{ display: "flex", m: 2, p: 2 }}>
      <img
        src={`${BASEURL}/${props.menuItem.image}`}
        alt={props.menuItem.name}
        style={{
          width: "200px",
          height: "200px",
          objectFit: "cover",
          borderRadius: "10px",
          aspectRatio: "1",
        }}
      />
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography variant="h5" sx={{ pr: 2 }}>
            {props.menuItem.name}
          </Typography>
          {props.menuItem.isVeg && (
            <img src={vegIcon} alt="Vegetarian icon" width="25" height="25" />
          )}
          {props.menuItem.isSpicy && (
            <img src={spicyIcon} alt="Spicy icon" width="50" height="50" />
          )}
        </Box>
        <Typography variant="subtitle1">
          {props.menuItem.description}
        </Typography>
        <Typography variant="h6">{props.menuItem.price} CHF</Typography>
      </Box>
      {props.isOwner ? (
        <>
          <Button style={{ backgroundColor: "white" }} onClick={setMenuItem}>
            <ModeEditIcon sx={{ fontSize: "40px" }} />
          </Button>
          <Button
            style={{ backgroundColor: "white", color: "#d32f2f" }}
            onClick={onDeleteMenuItem}
          >
            <DeleteIcon sx={{ fontSize: "40px" }} />
          </Button>
        </>
      ) : props.menuItem.isAvailable ? (
        !isLoggedIn ? (
          <>
            <Button color="primary" onClick={props.handleOpen}>
              <AddCircleOutlineIcon sx={{ fontSize: "40px" }} />
            </Button>
            <LoginModal open={props.open} handleClose={props.handleClose} />
          </>
        ) : (
          <Button color="primary" onClick={onAddToCart}>
            <AddCircleOutlineIcon sx={{ fontSize: "40px" }} />
          </Button>
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
