import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { CartItemType } from "../types/cartItem";
import { BASEURL } from "../../config";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useAppDispatch } from "../store/root";
import { cartActions } from "../store/cart";
import { useTheme, useMediaQuery } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const smallScreenConfig = {
  imageStyle: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "10px",
    aspectRatio: "1",
  },
} as const;

const largeScreenConfig = {
  imageStyle: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "10px",
    aspectRatio: "1",
  },
} as const;

export default function CartItemCard(props: { cartItem: CartItemType }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();

  const onIncreaseQuantity = () => {
    dispatch(cartActions.increaseQuantity(props.cartItem.id));
  };

  const onDecreaseQuantity = () => {
    dispatch(cartActions.decreaseQuantity(props.cartItem.id));
  };

  const onDeleteCartItem = () => {
    dispatch(cartActions.deleteItem(props.cartItem.id));
  };

  const style = isSmallScreen ? smallScreenConfig : largeScreenConfig;

  return isSmallScreen ? (
    <>
      <Card
        elevation={6}
        sx={{ my: 2, p: 2, backgroundColor: "#fff6f2", borderRadius: "15px" }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={`${BASEURL}/${props.cartItem.image}`}
            alt={props.cartItem.name}
            style={style.imageStyle}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ px: 2 }}>
              {props.cartItem.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "#8b8989", px: 2 }}>
              {props.cartItem.description}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 1,
          }}
        >
          <Typography variant="subtitle2" fontWeight={700}>
            CHF {props.cartItem.price.toFixed(2)}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton color="primary" onClick={onDecreaseQuantity}>
              <RemoveCircleOutlineIcon sx={{ fontSize: "28px" }} />
            </IconButton>
            <Typography variant="body2" fontWeight={700}>
              Qty: {props.cartItem.quantity}
            </Typography>
            <IconButton color="primary" onClick={onIncreaseQuantity}>
              <AddCircleOutlineIcon sx={{ fontSize: "28px" }} />
            </IconButton>
          </Box>

          <Button
          style={{ backgroundColor: "#fff6f2", color: "primary" }}
          onClick={onDeleteCartItem}
        >
          <DeleteOutlineIcon sx={{ fontSize: "28px", ml: 1 }} />
        </Button>
        </Box>
      </Card>
    </>
  ) : (
    <>
      {" "}
      <Card
        elevation={6}
        sx={{
          display: "flex",
          m: 2,
          px: 3,
          py: 2,
          backgroundColor: "#fff6f2",
          borderRadius: "15px",
          alignItems: "center",
        }}
      >
        <img
          src={`${BASEURL}/${props.cartItem.image}`}
          alt={props.cartItem.name}
          style={style.imageStyle}
        />

        <Box sx={{ flexGrow: 1, my: 2, mx: 4 }}>
          <Typography variant="h6" fontWeight={700}>
            {props.cartItem.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "#8b8989" }}>
            {props.cartItem.description}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mx: 4,
          }}
        >
          <IconButton color="primary" onClick={onDecreaseQuantity}>
            <RemoveCircleOutlineIcon sx={{ fontSize: "36px" }} />
          </IconButton>
          <Typography variant="subtitle1" fontWeight={700}>
            Qty: {props.cartItem.quantity}
          </Typography>
          <IconButton color="primary" onClick={onIncreaseQuantity}>
            <AddCircleOutlineIcon sx={{ fontSize: "36px" }} />
          </IconButton>
        </Box>
        <Typography variant="subtitle1" fontWeight={700}>
          CHF {(props.cartItem.price * props.cartItem.quantity).toFixed(2)}
        </Typography>
        <Button
          style={{ backgroundColor: "#fff6f2", color: "primary" }}
          onClick={onDeleteCartItem}
        >
          <DeleteOutlineIcon sx={{ fontSize: "32px", ml: 1 }} />
        </Button>
      </Card>
    </>
  );
}
