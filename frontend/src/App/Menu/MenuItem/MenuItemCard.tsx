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
  CenterFlexBox,
  GreyTypography,
  OrangePaper,
  PrimaryIconButton,
} from "../../../components";
import { lgImgStyle, mdImgStyle } from "../../../components/imgStyle";
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
      {/* <OrangePaper
        sx={{
          display: "flex",
          m: 2,
        }}
      >
        <img
          src={`${BASEURL}/${props.menuItem.image}`}
          alt={props.menuItem.name}
          style={mdImgStyle}
        />
        <Box sx={{ flexGrow: 1, ml: 2, my: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <BoldTypography variant="body1" sx={{ pr: 1 }}>
              {props.menuItem.name}
            </BoldTypography>
            {props.menuItem.isVeg && (
              <img src={vegIcon} alt="Vegetarian icon" width="20" height="20" />
            )}
            {props.menuItem.isSpicy && (
              <img src={spicyIcon} alt="Spicy icon" width="25" height="25" />
            )}
          </Box>
          <GreyTypography variant="body2">
            {props.menuItem.description}
          </GreyTypography>
          <BoldTypography variant="subtitle2">
            CHF {props.menuItem.price}
          </BoldTypography>
        </Box>
        {props.isOwner ? (
          <>
            <Button
              style={{ backgroundColor: "#fff6f2" }}
              onClick={setMenuItem}
            >
              <ModeEditIcon sx={{ fontSize: "36px" }} />
            </Button>
            <Button
              style={{ backgroundColor: "#fff6f2", color: "primary" }}
              onClick={onDeleteMenuItem}
            >
              <DeleteIcon sx={{ fontSize: "36px", color: "primary" }} />
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
                <AddCircleOutlineIcon sx={{ fontSize: "36px" }} />
              </PrimaryIconButton>
            </CenterFlexBox>
          )
        ) : (
          <img
            src={soldOut}
            alt="Sold Out"
            width="80"
            height="80"
            style={{ margin: "auto" }}
          />
        )}
      </OrangePaper> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          mt: 3,
          mx: 3,
        }}
      >
        <PrimaryIconButton onClick={props.handleOpen}>
          <AddCircleOutlineIcon
            sx={{ fontSize: "40px", position: "fixed", right: 20, bottom: 10 }}
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

        {/* {props.isOwner ? (
          <>
            <Button
              style={{ backgroundColor: "#fff6f2" }}
              onClick={setMenuItem}
            >
              <ModeEditIcon sx={{ fontSize: "36px" }} />
            </Button>
            <Button
              style={{ backgroundColor: "#fff6f2", color: "primary" }}
              onClick={onDeleteMenuItem}
            >
              <DeleteIcon sx={{ fontSize: "36px", color: "primary" }} />
            </Button>
          </>
        ) : props.menuItem.isAvailable ? (
          !isLoggedIn ? (
            <CenterFlexBox>
              <PrimaryIconButton onClick={props.handleOpen}>
                <AddCircleOutlineIcon sx={{ fontSize: "40px", position:"fixed", right:0, bottom:0 }} />
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
                <AddCircleOutlineIcon sx={{ fontSize: "36px" }} />
              </PrimaryIconButton>
            </CenterFlexBox>
          )
        ) : (
          <img
            src={soldOut}
            alt="Sold Out"
            width="80"
            height="80"
            style={{ margin: "auto" }}
          />
        )} */}
      </Box>
    </animated.div>
  );
}
