import {
  Box,
  ListItem,
  ListItemButton,
  Paper,
} from "@mui/material";
import dayjs from "dayjs";
import { OrderType } from "../types/order";
import { BoldTypography, GreyTypography } from "../../components";

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
            <BoldTypography variant="subtitle2">
              Order #{props.order.id}
            </BoldTypography>
            <GreyTypography variant="subtitle2">
              {props.order.pickUpDate}{" "}
              {dayjs(props.order.pickUpTime, "HH:mm:ss").format("HH:mm")}
            </GreyTypography>
          </Box>
          <BoldTypography variant="subtitle2" sx={{ color: "green" }}>
            {" "}
            CHF {parseFloat(props.order.totalPrice).toFixed(2)}
          </BoldTypography>
        </Paper>
      </ListItemButton>
    </ListItem>
  );
}
