import { Container, Typography } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";

export default function Checkout() {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Container sx={{ my: 5, py: 5 }}>
      <Typography
        variant={isMediumScreen ? "h4" : "subtitle1"}
        sx={{ m: 2, textAlign: "left", fontWeight: 600 }}
      >
        Place your order
      </Typography>
      <CartItem />
      <CheckoutForm />
    </Container>
  );
}
