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
import Modal from "../../UI/Modal";
import { useNavigate } from "react-router-dom";
import {
  BoldTypography,
  CenterFlexBox,
  GreyTypography,
  OrangePaper,
  PrimaryIconButton,
} from "../../../components";
import { lgImgStyle } from "../../../components/imgStyle";

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
    <OrangePaper
      sx={{
        display: "flex",
        my: 2,
        mx: 4,
      }}
    >
      <img
        src={`${BASEURL}/${props.menuItem.image}`}
        alt={props.menuItem.name}
        style={lgImgStyle}
      />
      <Box sx={{ flexGrow: 1, mx: 3, my: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <BoldTypography variant="h6" sx={{ pr: 2 }}>
            {props.menuItem.name}
          </BoldTypography>
          {props.menuItem.isVeg && (
            <img src={vegIcon} alt="Vegetarian icon" width="25" height="25" />
          )}
          {props.menuItem.isSpicy && (
            <img src={spicyIcon} alt="Spicy icon" width="35" height="35" />
          )}
        </Box>
        <GreyTypography variant="body1">
          {props.menuItem.description}
        </GreyTypography>
        <BoldTypography variant="h6">CHF {props.menuItem.price}</BoldTypography>
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
          <CenterFlexBox>
            <PrimaryIconButton onClick={props.handleOpen}>
              <AddCircleOutlineIcon sx={{ fontSize: "40px" }} />
            </PrimaryIconButton>
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
          </CenterFlexBox>
        ) : (
          <CenterFlexBox>
            <PrimaryIconButton onClick={onAddToCart}>
              <AddCircleOutlineIcon sx={{ fontSize: "40px" }} />
            </PrimaryIconButton>
          </CenterFlexBox>
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
    </OrangePaper>
  );
}
