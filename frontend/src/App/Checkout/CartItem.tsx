import { Box, Divider, Paper, Typography } from "@mui/material";
import { useAppSelector } from "../store/root";
import { BASEURL } from "../../config";

export default function CartItem() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  return (
    <Paper
      elevation={0}
      sx={{
        mt: { md: 3 },
        p: 2,
        borderRadius: "10px",
      }}
    >
      <Typography variant="h5" fontWeight={700} sx={{ py: 1 }}>
        Summary
      </Typography>
      {cartItems.map((cartItem) => (
        <Box
          key={cartItem.name}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              my: 2,
            }}
          >
            <img
              src={`${BASEURL}/${cartItem.image}`}
              alt={cartItem.name}
              width="50px"
              height="50px"
              style={{ borderRadius: "10px" }}
            />
            <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
              <Typography variant="subtitle1" fontWeight={700}>
                {cartItem.name}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "#8b8989" }}>
                {cartItem.quantity}x
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1">{cartItem.price} </Typography>
        </Box>
      ))}
      <Divider sx={{ mt: 3 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 3,
        }}
      >
        <Typography variant="subtitle1" fontWeight={700}>
          Total
        </Typography>
        <Typography variant="h5" fontWeight={700}>
          CHF {totalPrice.toFixed(2)}
        </Typography>
      </Box>
    </Paper>
  );
}
