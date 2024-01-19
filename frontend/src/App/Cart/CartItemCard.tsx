import { Box, Divider, IconButton, Typography } from "@mui/material";
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
import {
  BoldTypography,
  CenterFlexBox,
  SpaceBetweenFlexBox,
} from "../../components";
import { smImgStyle, mdImgStyle } from "../../components/imgStyle";

const smallScreenConfig = {
  cardStyle: {
    py: 0,
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
    fontSize: "22px",
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
    fontSize: "28px",
  },
} as const;

const outerBoxStyle = {
  display: "flex",
  alignItems: "center",
};

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
      <Divider sx={{ my: 1 }} />
      <animated.div style={fadeOutAnimation}>
        <Box sx={style.cardStyle}>
          <Box sx={outerBoxStyle}>
            <img
              src={`${BASEURL}/${props.cartItem.image}`}
              alt={props.cartItem.name}
              style={style.imageStyle}
            />
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <SpaceBetweenFlexBox>
                <BoldTypography variant="body2" sx={{ px: 2 }}>
                  {props.cartItem.name}
                </BoldTypography>
                <IconButton color="primary" onClick={onDeleteCartItem}>
                  <DeleteOutlineIcon sx={{ fontSize: "22px" }} />
                </IconButton>
              </SpaceBetweenFlexBox>

              <SpaceBetweenFlexBox sx={{ mx: 1 }}>
                <CenterFlexBox>
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
                <BoldTypography variant="subtitle2">
                  CHF {props.cartItem.price.toFixed(2)}
                </BoldTypography>
              </SpaceBetweenFlexBox>
            </Box>
          </Box>

          <Box sx={style.innerFirstBoxStyle}></Box>
        </Box>
      </animated.div>
    </>
  ) : (
    <>
      <animated.div style={fadeOutAnimation}>
        <SpaceBetweenFlexBox sx={{ mx: 3, my: 1 }}>
          <img
            src={`${BASEURL}/${props.cartItem.image}`}
            alt={props.cartItem.name}
            style={style.imageStyle}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BoldTypography variant="subtitle1">
              {props.cartItem.name}
            </BoldTypography>
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
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BoldTypography variant="subtitle1" sx={{ mr: 2 }}>
              CHF {(props.cartItem.price * props.cartItem.quantity).toFixed(2)}
            </BoldTypography>
            <IconButton color="primary" onClick={onDeleteCartItem}>
              <DeleteOutlineIcon sx={{ fontSize: "28px" }} />
            </IconButton>
          </Box>
        </SpaceBetweenFlexBox>
      </animated.div>
    </>
  );
}
