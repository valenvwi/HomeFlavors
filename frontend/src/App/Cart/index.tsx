import { Box, Button, Container, Divider, Typography } from "@mui/material";
import CartItemCard from "./CartItemCard";
import { useAppSelector } from "../store/root";
import { CartItemType } from "../types/cartItem";
import { useTheme, useMediaQuery } from "@mui/material";
import emptyCart from "../../assets/empty-cart.png";
import { useNavigate } from "react-router-dom";
import { ComponentPropsWithoutRef } from "react";

const smallScreenConfig = {
  fontVariant: "subtitle1",
  fontStyle: {
    my: 1,
  },
} as const;

const largeScreenConfig = {
  fontVariant: "h6",
  fontStyle: {
    mt: 2,
    mb: 2,
    mx: 1,
    textAlign: "right",
  },
} as const;

const containerStyle = {
  mt: 5,
  py: 5,
  display: "flex",
  flexDirection: "column",
  minHeight: "98vh",
};

const containerWithEmptyCartStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  flexGrow: 1,
};

const emptyCartBoxStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const flexBoxStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mt: 2,
};

const BoldTypography = (props: ComponentPropsWithoutRef<typeof Typography>) => (
  <Typography fontWeight={700} {...props} />
);

const ContainedButton = (props: ComponentPropsWithoutRef<typeof Button>) => (
  <Button variant="contained" {...props} />
);

export default function Cart() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const style = isSmallScreen ? smallScreenConfig : largeScreenConfig;

  const navigate = useNavigate();

  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);

  const goToHomePage = () => {
    navigate("/");
  };

  const goToCheckoutPage = () => {
    navigate("/checkout");
  };

  return cartItems.length > 0 ? (
    <Container sx={containerStyle}>
      <BoldTypography
        variant={style.fontVariant}
        sx={{ mt: { xs: 0, md: 1 }, mx: 2, textAlign: "left" }}
      >
        Your cart ({totalQuantity})
      </BoldTypography>
      <Box sx={{ flexGrow: isSmallScreen ? 1 : 0 }}>
        {cartItems.map((cartItem: CartItemType) => (
          <CartItemCard key={cartItem.id} cartItem={cartItem} />
        ))}
      </Box>
      {isSmallScreen ? (
        <>
          <Box>
            <Divider sx={{ mt: 3 }} />
            <Box sx={flexBoxStyle}>
              <Box>
                <Typography variant="body2">Total Price</Typography>
                <Typography variant="body1" sx={style.fontStyle}>
                  CHF <b>{totalPrice.toFixed(2)}</b>
                </Typography>
              </Box>
              <ContainedButton sx={{ m: 1 }} onClick={goToCheckoutPage}>
                Check out
              </ContainedButton>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <BoldTypography variant={style.fontVariant} sx={style.fontStyle}>
            Total Price: CHF {totalPrice.toFixed(2)}
          </BoldTypography>
          <ContainedButton
            sx={{ mx: 1, alignSelf: "end" }}
            onClick={goToCheckoutPage}
          >
            Check out
          </ContainedButton>
        </>
      )}
    </Container>
  ) : (
    <Container sx={containerWithEmptyCartStyle}>
      <Box sx={emptyCartBoxStyle}>
        <img src={emptyCart} alt="empty shopping cart" width="250" />
        <BoldTypography variant="h5">Your cart is empty</BoldTypography>
        <ContainedButton sx={{ my: 3 }} onClick={goToHomePage}>
          Shop now
        </ContainedButton>
      </Box>
    </Container>
  );
}
