import { Container, Grid } from "@mui/material";
import CheckoutForm from "./CheckoutForm";
import CartItem from "./CartItem";
import PaymentForm from "./PaymentForm";
import Modal from "../UI/Modal";
import { useAppSelector } from "../store/root";

export default function Checkout() {
  const isCheckingout = useAppSelector((state) => state.modal.isCheckingout);

  return (
    <Container sx={{ mt: 5, py: 5, flexGrow: 1 }}>
      {/* <Modal
        open={isCheckingout}
        message="Placing the order now..."
        icon="loading"
      /> */}
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
