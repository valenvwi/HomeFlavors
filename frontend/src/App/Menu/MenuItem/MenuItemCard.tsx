import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { MenuItemType } from "../../types/menuItem";
import { BASEURL } from "../../../config";
import spicyIcon from "../../../assets/spicy1.jpg";
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
  GreyTypography,
  PrimaryIconButton,
} from "../../../components";
import { lgImgStyle } from "../../../components/imgStyle";
import { useSpring, animated } from "@react-spring/web";

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

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
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          my: 3,
          mx: 3,
        }}
      >
        {isLoggedIn ? (
          props.isOwner ? (
            <>
              <Button
                onClick={setMenuItem}
                sx={{ position: "absolute", right: 30, bottom: 12 }}
              >
                <ModeEditIcon
                  sx={{
                    fontSize: "28px",
                  }}
                />
              </Button>
              <Button
                onClick={onDeleteMenuItem}
                sx={{ position: "absolute", right: 0, bottom: 12 }}
              >
                <DeleteIcon
                  sx={{
                    fontSize: "28px",
                  }}
                />
              </Button>
            </>
          ) : props.menuItem.isAvailable ? (
            <PrimaryIconButton onClick={onAddToCart}>
              <AddCircleOutlineIcon
                sx={{
                  fontSize: "40px",
                }}
              />
            </PrimaryIconButton>
          ) : (
            <img
              src={soldOut}
              alt="Sold out"
              width="60"
              height="60"
              style={{ position: "absolute", right: 0, bottom: 5 }}
            />
          )
        ) : (
          <>
            <PrimaryIconButton onClick={props.handleOpen}>
              <AddCircleOutlineIcon
                sx={{
                  fontSize: "40px",
                }}
              />
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
          </>
        )}
        <img
          src={`${BASEURL}/${props.menuItem.image}`}
          alt={props.menuItem.name}
          style={lgImgStyle}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 1,
          }}
        >
          <BoldTypography variant="subtitle1" sx={{ mr: 1 }}>
            {props.menuItem.name}
          </BoldTypography>
          {props.menuItem.isVeg && (
            <img src={vegIcon} alt="Vegetarian icon" width="20" height="20" />
          )}
          {props.menuItem.isSpicy && (
            <img src={spicyIcon} alt="Spicy icon" width="20" height="20" />
          )}
        </Box>
        <GreyTypography
          variant="body2"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "calc(1.5em * 3)",
          }}
        >
          {props.menuItem.description}
        </GreyTypography>
        <BoldTypography variant="subtitle1" sx={{ mt: 1, mb: 2 }}>
          CHF {props.menuItem.price}
        </BoldTypography>
      </Box>
    </animated.div>
  );
}
