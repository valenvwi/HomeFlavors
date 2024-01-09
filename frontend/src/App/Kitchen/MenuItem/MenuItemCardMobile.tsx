import { Box, Button } from "@mui/material";
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
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import Modal from "../../UI/Modal";
import { useNavigate } from "react-router-dom";
import {
  BoldTypography,
  CenterFlexBox,
  GreyTypography,
  OrangePaper,
  SpaceBetweenFlexBox,
} from "../../../components";
import { lgImgStyle } from "../../../components/imgStyle";

const boxStyle = {
  display: "flex",
  alignItems: "center",
  my: 2,
  mx: 1,
};

export default function MenuItemCard(props: {
  menuItem: MenuItemType;
  isOwner: boolean;
  onSetMenuItem: (menuItem: MenuItemType) => void;
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  onSetMenuItemId: (id: number) => void;
  openDeleteDialog: () => void;
  isEntering: boolean;
}) {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

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

  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignup = () => {
    navigate("/signup");
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  };

  const enterAnimation = useSpring({
    opacity: props.isEntering ? 0 : 1,
    transform: props.isEntering
      ? "translate3d(0,20%,0)"
      : "translate3d(0,0%,0)",
    config: { duration: 100 },
  });

  return (
    <animated.div style={enterAnimation}>
      <OrangePaper
        sx={{
          display: "flex",
          flexDirection: "column",
          my: 2,
        }}
      >
        <img
          src={`${BASEURL}/${props.menuItem.image}`}
          alt={props.menuItem.name}
          style={lgImgStyle}
        />
        <Box sx={boxStyle}>
          <BoldTypography variant="subtitle1" sx={{ pr: 2 }}>
            {props.menuItem.name}
          </BoldTypography>
          {props.menuItem.isVeg && (
            <img src={vegIcon} alt="Vegetarian icon" width="25" height="25" />
          )}
          {props.menuItem.isSpicy && (
            <img src={spicyIcon} alt="Spicy icon" width="35" height="35" />
          )}
        </Box>
        <GreyTypography variant="subtitle2" sx={{ mx: 1 }}>
          {props.menuItem.description}
        </GreyTypography>
        <SpaceBetweenFlexBox
          sx={{
            m: 1,
          }}
        >
          <BoldTypography variant="subtitle1">
            CHF {props.menuItem.price}
          </BoldTypography>
          {props.isOwner ? (
            <>
              <CenterFlexBox>
                <Button
                  style={{ backgroundColor: "#fff6f2" }}
                  onClick={setMenuItem}
                >
                  <ModeEditIcon sx={{ fontSize: "32px" }} />
                </Button>
                <Button
                  style={{ backgroundColor: "#fff6f2", color: "#EA5C2B" }}
                  onClick={onDeleteMenuItem}
                >
                  <DeleteIcon sx={{ fontSize: "32px" }} />
                </Button>
              </CenterFlexBox>
            </>
          ) : props.menuItem.isAvailable ? (
            !isLoggedIn ? (
              <>
                <Button color="primary" onClick={props.handleOpen}>
                  <AddCircleOutlineIcon sx={{ fontSize: "40px" }} />
                </Button>
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
              </>
            ) : (
              <Button color="primary" onClick={onAddToCart}>
                <AddCircleOutlineIcon sx={{ fontSize: "40px" }} />
              </Button>
            )
          ) : (
            <img src={soldOut} alt="Sold Out" width="75" height="75" />
          )}
        </SpaceBetweenFlexBox>
      </OrangePaper>
    </animated.div>
  );
}
