import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { CartItemType } from "../types/cartItem";
import { BASEURL } from "../../config";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useAppDispatch } from "../store/root";
import { cartActions } from "../store/cart";
import { useTheme, useMediaQuery } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ComponentPropsWithoutRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { BoldTypography, CenterFlexBox } from "../../components";
import { smImgStyle, mdImgStyle } from "../../components/imgStyle";

const smallScreenConfig = {
  cardStyle: {
    py: 3,
  },
  innerFirstBoxStyle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    my: 1,
  },
  innerSecondBoxStyle: {
    my: 1,
  },
  imageStyle: smImgStyle,
  iconStyle: {
    fontSize: "28px",
  },
} as const;

const largeScreenConfig = {
  cardStyle: {
    display: "flex",
    m: 1,
    px: 3,
    alignItems: "center",
  },
  innerFirstBoxStyle: { flexGrow: 1, my: 2, mx: 4 },
  innerSecondBoxStyle: {
    mx: 4,
  },
  imageStyle: mdImgStyle,
  iconStyle: {
    fontSize: "36px",
  },
} as const;

const outerBoxStyle = {
  display: "flex",
  alignItems: "center",
};

const GreyTypography = (props: ComponentPropsWithoutRef<typeof Typography>) => (
  <Typography color="#8b8989" {...props} />
);

export default function CartItemCard(props: { cartItem: CartItemType }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();

  const onIncreaseQuantity = () => {
    dispatch(cartActions.increaseQuantity(props.cartItem.id));
  };

  const onDecreaseQuantity = () => {
    if (props.cartItem.quantity === 1) {
      setIsRemoved(true);
      setTimeout(
        () => dispatch(cartActions.decreaseQuantity(props.cartItem.id)),
        500
      );
    } else {
      dispatch(cartActions.decreaseQuantity(props.cartItem.id));
    }
  };

  const onDeleteCartItem = () => {
    setIsRemoved(true);
    setTimeout(() => dispatch(cartActions.deleteItem(props.cartItem.id)), 500);
  };

  const style = isSmallScreen ? smallScreenConfig : largeScreenConfig;

  const [isRemoved, setIsRemoved] = useState(false);

  const fadeOutAnimation = useSpring({
    opacity: isRemoved ? 0 : 1,
    transform: isRemoved ? "translate3d(-100%,0,0)" : "translate3d(0%,0,0)",
    config: { duration: 200 },
  });

  return isSmallScreen ? (
    <>
      <animated.div style={fadeOutAnimation}>
        <Box sx={style.cardStyle}>
          <Box sx={outerBoxStyle}>
            <img
              src={`${BASEURL}/${props.cartItem.image}`}
              alt={props.cartItem.name}
              style={style.imageStyle}
            />
            <Box>
              <BoldTypography variant="subtitle1" sx={{ px: 2 }}>
                {props.cartItem.name}
              </BoldTypography>
              <GreyTypography variant="body2" sx={{ px: 2 }}>
                {props.cartItem.description}
              </GreyTypography>
            </Box>
          </Box>
          <Box sx={style.innerFirstBoxStyle}>
            <BoldTypography variant="subtitle2">
              CHF {props.cartItem.price.toFixed(2)}
            </BoldTypography>

            <CenterFlexBox sx={style.innerSecondBoxStyle}>
              <IconButton color="primary" onClick={onDecreaseQuantity}>
                <RemoveCircleOutlineIcon sx={style.iconStyle} />
              </IconButton>
              <BoldTypography variant="body2">
                Qty: {props.cartItem.quantity}
              </BoldTypography>
              <IconButton color="primary" onClick={onIncreaseQuantity}>
                <AddCircleOutlineIcon sx={style.iconStyle} />
              </IconButton>
            </CenterFlexBox>

            <IconButton color="primary" onClick={onDeleteCartItem}>
              <DeleteOutlineIcon sx={{ fontSize: "28px", ml: 1 }} />
            </IconButton>
          </Box>
        </Box>
      </animated.div>
    </>
  ) : (
    <>
      <animated.div style={fadeOutAnimation}>
        <Box sx={style.cardStyle}>
          <img
            src={`${BASEURL}/${props.cartItem.image}`}
            alt={props.cartItem.name}
            style={style.imageStyle}
          />

          <Box sx={style.innerFirstBoxStyle}>
            <BoldTypography variant="subtitle1">
              {props.cartItem.name}
            </BoldTypography>
            <GreyTypography variant="body2">
              {props.cartItem.description}
            </GreyTypography>
          </Box>
          <CenterFlexBox sx={style.innerSecondBoxStyle}>
            <IconButton color="primary" onClick={onDecreaseQuantity}>
              <RemoveCircleOutlineIcon sx={style.iconStyle} />
            </IconButton>
            <BoldTypography variant="subtitle1">
              Qty: {props.cartItem.quantity}
            </BoldTypography>
            <IconButton color="primary" onClick={onIncreaseQuantity}>
              <AddCircleOutlineIcon sx={style.iconStyle} />
            </IconButton>
          </CenterFlexBox>
          <BoldTypography variant="subtitle1" sx={{ mr: 2 }}>
            CHF {(props.cartItem.price * props.cartItem.quantity).toFixed(2)}
          </BoldTypography>
          <IconButton color="primary" onClick={onDeleteCartItem}>
            <DeleteOutlineIcon sx={{ fontSize: "36px" }} />
          </IconButton>
        </Box>
      </animated.div>
    </>
  );
}
