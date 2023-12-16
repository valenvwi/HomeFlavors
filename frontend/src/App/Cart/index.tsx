import { Box, Container, Typography } from "@mui/material";
import CartItemCard from "./CartItemCard";
import { useAppSelector } from "../store/root";
import { CartItemType } from "../types/cartItem";

export default function Cart() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 5, pt: 5 }}>
        Cart
      </Typography>
      {cartItems ? (
        <>
          {cartItems.map((cartItem: CartItemType) => (
            <CartItemCard key={cartItem.id} cartItem={cartItem} />
          ))}
          <Typography variant="h5" sx={{ mt: 5 }}>
            Total Quantity: {totalQuantity}
          </Typography>
          <Typography variant="h5" sx={{ mt: 5 }}>
            Total Price: {totalPrice} CHF
          </Typography>
        </>
      ) : (
        <Box sx={{ mt: 5, pt: 5 }}>
          <Typography variant="h5">Your cart is empty</Typography>
        </Box>
      )}
    </Container>
  );
}
