import { Box, Container, Typography } from "@mui/material";
import { ordersPartialUpdate, useOrdersList } from "../../../api/index";
import { useState } from "react";
import { OrderType } from "../types/order";
import selectImg from "../../assets/select-img.png";
import LeftOrderList from "./LeftOrderList";
import RightOrderDetailCard from "./RightOrderDetailCard";
export default function PendingOrders() {
  const { data: ordersResponse } = useOrdersList({
    kitchen_pending_orders: true,
  });

  const pendingOrders = ordersResponse?.data;

  const { data: upcomingOrdersResponse } = useOrdersList({
    kitchen_pending_orders: false,
  });
  const upcomingOrders = upcomingOrdersResponse?.data;

  console.log("Pending orders: ", pendingOrders);
  console.log("Upcoming orders: ", upcomingOrders);

  const { refetch } = useOrdersList({
    kitchen_pending_orders: true,
  });

  const [order, setOrder] = useState<OrderType | null>(null);

  const acceptOrder = async (orderId: number) => {
    await ordersPartialUpdate(orderId, {
      isAccepted: true,
    });

    setOrder(null);
    refetch();
  };

  const cancelOrder = async (orderId: number) => {
    await ordersPartialUpdate(orderId, {
      isCancelled: true,
    });

    setOrder(null);
    refetch();
  };

  return (
    <>
      <Container sx={{ pt: 5, display: "flex" }}>
        {pendingOrders && upcomingOrders && (
          <LeftOrderList
            pendingOrders={pendingOrders}
            upcomingOrders={upcomingOrders}
            onSetOrder={setOrder}
          />
        )}
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
            <RightOrderDetailCard
              order={order}
              acceptOrder={acceptOrder}
              cancelOrder={cancelOrder}
            />
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
