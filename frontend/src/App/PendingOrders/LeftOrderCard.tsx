import {
  Box,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { OrderType } from "../types/order";

const paperStyle = {
  p: 3,
  display: "flex",
  alignItems: "top",
  justifyContent: "space-between",
  flexGrow: 1,
};
type Props = {
  order: OrderType;
  changeOrder: (order: OrderType) => void;
};

export default function LeftOrderCard(props: Props) {
  const changeOrder = (order: OrderType) => {
    props.changeOrder(order);
  };

  return (
    <ListItem key={props.order.id} disablePadding>
      <ListItemButton
        onClick={() => changeOrder(props.order)}
        sx={{ justifyContent: "center" }}
      >
        <Paper sx={paperStyle}>
          <Box>
            <Typography variant="subtitle2" fontWeight={700}>
              Order #{props.order.id}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "#8b8989" }}>
              {props.order.pickUpDate}{" "}
              {dayjs(props.order.pickUpTime, "HH:mm:ss").format("HH:mm")}
            </Typography>
          </Box>
          <Typography
            variant="subtitle2"
            fontWeight={700}
            sx={{ color: "green" }}
          >
            {" "}
            CHF {parseFloat(props.order.totalPrice).toFixed(2)}
          </Typography>
        </Paper>
      </ListItemButton>
    </ListItem>
  );
}
