import { Box, Button, Card, Typography } from "@mui/material";
import { MenuItemType } from "../../types/menuItem";
import { BASEURL } from "../../../config";
import spicyIcon from "../../../assets/spicy.png";
import vegIcon from "../../../assets/veg.png";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { menuItemsDestroy } from "../../../../api";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import soldOut from "../../../assets/sold-out.png";
import { useAppDispatch, useAppSelector } from "../../store/root";
import { cartActions } from "../../store/cart";
import LoginModal from "../../UI/LoginModal";
import { useSpring, animated } from "@react-spring/web";
import { useState } from "react";

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

  const [isHovered, setIsHovered] = useState(false);

  const hoverAnimation = useSpring({
    to: {
      transform: isHovered ? "scale(1.1)" : "scale(1)",
    },
    config: { mass: 1, tension: 300, friction: 10 },
  });

  return (
    <Card elevation={6} sx={{ display: "flex", m: 2, p: 2, backgroundColor: "#fff6f2", borderRadius: "15px" }}>
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
      <Box sx={{ flexGrow: 1, mx: 3, my: 2 }}>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography variant="h5" sx={{ pr: 2, fontWeight: 700 }}>
            {props.menuItem.name}
          </Typography>
          {props.menuItem.isVeg && (
            <img src={vegIcon} alt="Vegetarian icon" width="25" height="25" />
          )}
          {props.menuItem.isSpicy && (
            <img src={spicyIcon} alt="Spicy icon" width="35" height="35" />
          )}
        </Box>
        <Typography variant="subtitle1">
          {props.menuItem.description}
        </Typography>
        <Typography variant="h6" fontWeight={700}>
          CHF {props.menuItem.price}
        </Typography>
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
            <animated.div
              style={{ ...hoverAnimation, margin: "auto" }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Button color="primary" onClick={props.handleOpen}>
                <AddCircleOutlineIcon sx={{ fontSize: "40px" }} />
              </Button>
            </animated.div>
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
