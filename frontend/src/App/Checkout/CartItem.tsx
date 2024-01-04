import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../store/root";
import { CartItemType } from "../types/cartItem";

export default function CartItem() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);

  return (
    <>
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography variant="h5" fontWeight={700} sx={{ m: 2 }}>
          Order review
        </Typography>
        <Table sx={{ minWidth: 280, my: 2 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((cartItem: CartItemType) => (
              <TableRow
                key={cartItem.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {cartItem.name}
                </TableCell>
                <TableCell align="right">{cartItem.quantity}</TableCell>
                <TableCell align="right">
                  {(cartItem.price * cartItem.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ textAlign: "right" }}>
          <Typography variant="h5" fontWeight={700}>
            Final price: {totalPrice.toFixed(2)} CHF
          </Typography>
        </Box>
      </TableContainer>
    </>
  );
}
