import { Container, Typography } from "@mui/material";

export default function SuccessCheckout() {
  return (
    <Container sx={{ my: 5, py: 5 }}>
      <Typography variant="h5">
        Your order has been successfully placed
      </Typography>
    </Container>
  );
}
