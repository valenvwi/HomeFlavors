import { Box, Button, Container, Typography } from "@mui/material";
import CartItemCard from "./CartItemCard";
import { useAppSelector } from "../store/root";
import { CartItemType } from "../types/cartItem";
import { useTheme, useMediaQuery } from "@mui/material";
import emptyCart from "../../assets/empty-cart.png";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const navigate = useNavigate();

  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);

  const goToHomePage = () => {
    navigate("/");
  };

  const goToCheckoutPage = () => {
    navigate("/checkout");
  }

  return cartItems.length > 0 ? (
    <Container sx={{ my: 5, py: 5 }}>
      {isMediumScreen && (
        <Typography
          variant={isMediumScreen ? "h5" : "subtitle1"}
          sx={{ mt: 5, mx: 2, textAlign: "left", fontWeight: 600 }}
        >
          Your cart
        </Typography>
      )}
      {cartItems.map((cartItem: CartItemType) => (
        <CartItemCard key={cartItem.id} cartItem={cartItem} />
      ))}
      <Typography
        variant={isMediumScreen ? "h5" : "subtitle1"}
        sx={{ mt: 5, mx: 2, textAlign: "right", fontWeight: 600 }}
      >
        Total Quantity: {totalQuantity}
        <br />
        {isMediumScreen && <br />}
        Total Price: {totalPrice} CHF
      </Typography>
      <Button variant="contained" sx={{ my: 2 }} onClick={goToCheckoutPage}>
        Check out
      </Button>
    </Container>
  ) : (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={emptyCart} alt="empty shopping cart" width="180" />
        <Typography variant="h5">Your cart is empty</Typography>
        <Button variant="contained" sx={{ my: 3 }} onClick={goToHomePage}>
          Shop now
        </Button>
      </Box>
    </Container>
  );
}
