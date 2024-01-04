import {
  Box,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { OrderType } from "../types/order";

type Props = {
  order: OrderType;
  changeOrder: (order: OrderType) => void;
};

export default function LeftOrderCard(props: Props) {
  const changeOrder = (order: OrderType) => {
    props.changeOrder(order);
    console.log("order:", order);
  };

  return (
    <ListItem key={props.order.id} disablePadding>
      <ListItemButton
        onClick={() => changeOrder(props.order)}
        sx={{ justifyContent: "center" }}
      >
        <Paper
          sx={{
            p: 3,
            display: "flex",
            alignItems: "top",
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Order #{props.order.id}
            </Typography>
            <Typography>
              {props.order.pickUpDate}{" "}
              {dayjs(props.order.pickUpTime, "HH:mm:ss").format("HH:mm")}
            </Typography>
          </Box>
          <Typography fontWeight={700} sx={{ color: "green" }}>
            {" "}
            CHF {props.order.totalPrice}
          </Typography>
        </Paper>
      </ListItemButton>
    </ListItem>
  );
}
