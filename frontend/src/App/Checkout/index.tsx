import { Container, Grid } from "@mui/material";
import CheckoutForm from "./CheckoutForm";
import CartItem from "./CartItem";
import PaymentForm from "./PaymentForm";

export default function Checkout() {
  return (
    <Container sx={{ mt: 5, py: 5 }}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <CartItem />
        </Grid>
        <Grid item xs={12} md={8}>
          <PaymentForm />
          <CheckoutForm />
        </Grid>
      </Grid>
    </Container>
  );
}
