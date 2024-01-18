import { Container, Grid } from "@mui/material";
import CheckoutForm from "./CheckoutForm";
import CartItem from "./CartItem";
import PaymentForm from "./PaymentForm";
import { BackgroundContainer } from "../../components";

export default function Checkout() {
  return (
    <BackgroundContainer>
      <Container>
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
    </BackgroundContainer>
  );
}
