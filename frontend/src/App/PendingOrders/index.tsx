import { Box, Container } from "@mui/material";
import { useOrdersList } from "../../../api/index";
import PendingOrderCard from "./PendingOrderCard";
import PendingOrderList from "./PendingOrderList";
import { useState } from "react";
import { OrderType } from "../types/order";

export default function PendingOrders() {
  const { data: ordersResponse } = useOrdersList({
    kitchen_pending_orders: true,
  });
  const orders = ordersResponse?.data;

  const [order, setOrder] = useState<OrderType | null>(null);

  return (
    <>
      <Container sx={{ pt: 5, display: "flex" }}>
        {orders && <PendingOrderList orders={orders} onSetOrder={setOrder} />}
        <Box
          sx={{ display: "flex", flexDirection: "column", mt: 5, flexGrow: 1 }}
        >
          {order != null ? (
            <PendingOrderCard order={order} />
          ) : (
            <h1>Click on an order to view details</h1>
          )}
        </Box>
      </Container>
    </>
  );
}
