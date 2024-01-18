import { Box, Divider, Paper, Typography } from "@mui/material";
import { useAppSelector } from "../store/root";
import { BASEURL } from "../../config";
import { BoldTypography, SpaceBetweenFlexBox } from "../../components";
import { CartItemType } from "../types/cartItem";

const outerBoxStyle = {
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  my: 2,
};

const innerBoxStyle = {
  display: "flex",
  flexDirection: "column",
  ml: 2,
};

const imgStyle = {
  width: "50px",
  height: "50px",
  borderRadius: "10px",
};

export default function CartItem() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "30px",
        margin: "90px auto 0 auto",
        p: 2,
      }}
    >
      <BoldTypography variant="h5" sx={{ py: 1 }}>
        Summary
      </BoldTypography>
      {cartItems.map((cartItem: CartItemType) => (
        <SpaceBetweenFlexBox key={cartItem.name}>
          <Box sx={outerBoxStyle}>
            <img
              src={`${BASEURL}/${cartItem.image}`}
              alt={cartItem.name}
              style={imgStyle}
            />
            <Box sx={innerBoxStyle}>
              <BoldTypography variant="subtitle2">
                {cartItem.name}
              </BoldTypography>
              <Typography variant="subtitle2" sx={{ color: "#8b8989" }}>
                {cartItem.quantity}x
              </Typography>
            </Box>
          </Box>
          <BoldTypography variant="body2">CHF {cartItem.price} </BoldTypography>
        </SpaceBetweenFlexBox>
      ))}
      <Divider sx={{ mt: 3 }} />

      <SpaceBetweenFlexBox
        sx={{
          my: 3,
        }}
      >
        <BoldTypography variant="subtitle1">Total</BoldTypography>
        <BoldTypography variant="h6">
          CHF {totalPrice.toFixed(2)}
        </BoldTypography>
      </SpaceBetweenFlexBox>
    </Box>
  );
}
