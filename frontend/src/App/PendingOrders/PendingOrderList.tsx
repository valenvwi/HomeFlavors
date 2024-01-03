import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import { OrderType } from "../types/order";
import dayjs from "dayjs";
import { useState } from "react";

type Props = {
  orders: OrderType[];
  onSetOrder: (orderId: number) => void;
};

export default function PendingOrderList(props: Props) {
  const [alignment, setAlignment] = useState("pending");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const changeOrder = (order: OrderType) => {
    props.onSetOrder(order);
    console.log("order:", order);
  };
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: "25%",
        flexShrink: 0,
        zIndex: 0,
        [`& .MuiDrawer-paper`]: { width: "25%", boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{ m: "auto", pt: 4 }}
      >
        <ToggleButton value="pending">Pending</ToggleButton>
        <ToggleButton value="upcoming">Upcoming</ToggleButton>
        <ToggleButton value="past">Past</ToggleButton>
      </ToggleButtonGroup>
      <Box sx={{ overflow: "auto", p: 2, my: 1 }}>
        <List>
          {props.orders.map((order) => (
            <ListItem key={order.id} disablePadding>
              <ListItemButton
                onClick={() => changeOrder(order)}
                sx={{ justifyContent: "center" }}
              >
                <Paper
                  sx={{ p: 3, display: "flex", alignItems: "top", justifyContent: "space-between", flexGrow: 1 }}
                >
                  <Box>
                    <Typography variant="h6" fontWeight={700}>
                      Order #{order.id}
                    </Typography>
                    <Typography>
                      {order.pickUpDate}{" "}
                      {dayjs(order.pickUpTime, "HH:mm:ss").format("HH:mm")}
                    </Typography>
                  </Box>
                  <Typography fontWeight={700} sx={{ color: "green" }}>
                    {" "}
                    CHF {order.totalPrice}
                  </Typography>
                </Paper>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
