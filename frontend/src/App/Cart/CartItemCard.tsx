import { Box, Button, Card, Typography } from "@mui/material";
import { CartItemType } from "../types/cartItem";
import { BASEURL } from "../../config";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useAppDispatch } from "../store/root";
import { cartActions } from "../store/cart";

export default function CartItemCard(props: { cartItem: CartItemType }) {
  const dispatch = useAppDispatch();

  const onIncreaseQuantity = () => {
    dispatch(cartActions.increaseQuantity(props.cartItem.id));
    console.log("increase quantity");
  };

  const onDecreaseQuantity = () => {
    dispatch(cartActions.decreaseQuantity(props.cartItem.id));
    console.log("decrease quantity");
  };

  return (
    <Card sx={{ display: "flex", m: 2, p: 2 }}>
      <img
        src={`${BASEURL}/${props.cartItem.image}`}
        alt={props.cartItem.name}
        style={{
          width: "150px",
          height: "150px",
          objectFit: "cover",
          borderRadius: "10px",
          aspectRatio: "1",
        }}
      />
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <Typography variant="h5" sx={{ pr: 2 }}>
          {props.cartItem.name}
        </Typography>
        <Typography variant="h6">{props.cartItem.price} CHF</Typography>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button color="primary" onClick={onDecreaseQuantity}>
          <RemoveCircleOutlineIcon sx={{ fontSize: "40px" }} />
        </Button>
        <Typography variant="h6">Qty: {props.cartItem.quantity}</Typography>
        <Button color="primary" onClick={onIncreaseQuantity}>
          <AddCircleOutlineIcon sx={{ fontSize: "40px" }} />
        </Button>
      </Box>
    </Card>
  );
}
