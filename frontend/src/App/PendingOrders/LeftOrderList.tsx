import {
  Box,
  Drawer,
  List,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import { OrderType } from "../types/order";
import { useEffect, useState } from "react";
import LeftOrderCard from "./LeftOrderCard";

type Props = {
  pendingOrders: OrderType[];
  upcomingOrders: OrderType[];
  onSetOrder: (orderId: number) => void;
};

export default function LeftOrderList(props: Props) {
  const [alignment, setAlignment] = useState("pending");
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    if (alignment === "pending") {
      setOrders(props.pendingOrders);
    } else {
      setOrders(props.upcomingOrders);
    }
  }, [alignment, props.pendingOrders, props.upcomingOrders]);

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
        sx={{ m: "0 auto", pt: 4 }}
      >
        <ToggleButton value="pending">Pending</ToggleButton>
        <ToggleButton value="upcoming">Upcoming</ToggleButton>
      </ToggleButtonGroup>
      <Box sx={{ overflow: "auto", p: 2, my: 1 }}>
        <List>
          {orders && orders.length === 0 ? (
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ textAlign: "center", py: 5 }}
            >
              No {alignment} orders
            </Typography>
          ) : (
            orders.map((order) => (
              <LeftOrderCard
                key={order.id}
                order={order}
                changeOrder={changeOrder}
              />
            ))
          )}
        </List>
      </Box>
    </Drawer>
  );
}
