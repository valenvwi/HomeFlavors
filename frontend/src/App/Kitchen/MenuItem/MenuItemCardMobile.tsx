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
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

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
    <Card
      elevation={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        my: 2,
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
          margin: "0 auto",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          my: 2,
          mx: 1,
        }}
      >
        <Typography variant="subtitle1" sx={{ pr: 2, fontWeight: 600 }}>
          {props.menuItem.name}
        </Typography>
        {props.menuItem.isVeg && (
          <img src={vegIcon} alt="Vegetarian icon" width="25" height="25" />
        )}
        {props.menuItem.isSpicy && (
          <img src={spicyIcon} alt="Spicy icon" width="35" height="35" />
        )}
      </Box>
      <Typography variant="subtitle2" sx={{ mx: 1 }}>
        {props.menuItem.description}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          m: 1,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          CHF {props.menuItem.price}
        </Typography>
        {props.isOwner ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                style={{ backgroundColor: "white" }}
                onClick={setMenuItem}
              >
                <ModeEditIcon sx={{ fontSize: "32px" }} />
              </Button>
              <Button
                style={{ backgroundColor: "white", color: "#d32f2f" }}
                onClick={onDeleteMenuItem}
              >
                <DeleteIcon sx={{ fontSize: "32px" }} />
              </Button>
            </Box>
          </>
        ) : props.menuItem.isAvailable ? (
          !isLoggedIn ? (
            <>
              <animated.div
                style={{ ...hoverAnimation }}
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
          <img src={soldOut} alt="Sold Out" width="75" height="75" />
        )}
      </Box>
    </Card>
  );
}
