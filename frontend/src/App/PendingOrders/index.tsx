import { Box, Container, Typography } from "@mui/material";
import { useOrdersList } from "../../../api/index";
import PendingOrderCard from "./PendingOrderCard";
import PendingOrderList from "./PendingOrderList";
import { useState } from "react";
import { OrderType } from "../types/order";
import selectImg from "../../assets/select-img.png";
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
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 5,
            flexGrow: 1,
            minHeight: "90vh",
          }}
        >
          {order != null ? (
            <PendingOrderCard order={order} />
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={selectImg} alt="Sold Out" width="250" />
              <Typography variant="h4" sx={{ textAlign: "center" }}>
                Click on an order to view details
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
}
