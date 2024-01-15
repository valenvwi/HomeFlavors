import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ordersPartialUpdate, useOrdersList } from "../../../api/index";
import { useState } from "react";
import { OrderType } from "../types/order";
import selectImg from "../../assets/select-img.png";
import noOrder from "../../assets/no-pending-orders.png";
import LeftOrderList from "./LeftOrderList";
import RightOrderDetailCard from "./RightOrderDetailCard";

const containerStyle = {
  pt: 5,
  display: "flex",
  flexGrow: 1,
};

const outerBoxStyle = {
  display: "flex",
  flexDirection: "column",
  mt: 5,
  flexGrow: 1,
};

const innerBoxStyle = {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  alignItems: "center",
  justifyContent: "center",
};

const fontTitleStyle = {
  fontWeight: 700,
  textAlign: "center",
  pt: 2,
};

const fontContentStyle = {
  textAlign: "center",
  color: "#8b8989",
};

export default function PendingOrders() {
  const { data: ordersResponse, refetch: refetchPending } = useOrdersList({
    kitchen_pending_orders: true,
  });

  const pendingOrders = ordersResponse?.data;

  const { data: upcomingOrdersResponse, refetch: refetchUpcoming } =
    useOrdersList({
      kitchen_pending_orders: false,
    });
  const upcomingOrders = upcomingOrdersResponse?.data;

  const [order, setOrder] = useState<OrderType | null>(null);
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [showOrderList, setShowOrderList] = useState<boolean>(true);

  const acceptOrder = async (orderId: number) => {
    await ordersPartialUpdate(orderId, {
      isAccepted: true,
    });

    setOrder(null);
    refetchPending();
    refetchUpcoming();
  };

  const cancelOrder = async (orderId: number) => {
    await ordersPartialUpdate(orderId, {
      isCancelled: true,
    });

    setOrder(null);
    refetchPending();
  };

  return (
    <>
      <Container sx={containerStyle}>
        {isMediumScreen ? (
          showOrderList ? (
            pendingOrders &&
            upcomingOrders && (
              <LeftOrderList
                pendingOrders={pendingOrders}
                upcomingOrders={upcomingOrders}
                onSetOrder={setOrder}
                onSetShowOrderList={setShowOrderList}
              />
            )
          ) : (
            <RightOrderDetailCard
              order={order}
              acceptOrder={acceptOrder}
              cancelOrder={cancelOrder}
              onSetShowOrderList={setShowOrderList}
            />
          )
        ) : (
          <>
            pendingOrders && upcomingOrders && (
            <LeftOrderList
              pendingOrders={pendingOrders}
              upcomingOrders={upcomingOrders}
              onSetOrder={setOrder}
            />
            )
            <Box sx={outerBoxStyle}>
              {order != null ? (
                <RightOrderDetailCard
                  order={order}
                  acceptOrder={acceptOrder}
                  cancelOrder={cancelOrder}
                  onSetShowOrderList={setShowOrderList}
                />
              ) : (
                <Box sx={innerBoxStyle}>
                  {pendingOrders?.length === 0 ? (
                    <>
                      <img src={noOrder} alt="Sold Out" width="250" />
                      <Typography variant="h5" sx={fontTitleStyle}>
                        You have no pending orders
                      </Typography>
                      <Typography variant="subtitle1" sx={fontContentStyle}>
                        Check out the upcoming orders
                      </Typography>
                    </>
                  ) : (
                    <>
                      <img src={selectImg} alt="Sold Out" width="250" />
                      <Typography variant="h5" sx={fontTitleStyle}>
                        You have <b>{pendingOrders?.length}</b> pending orders
                      </Typography>
                      <Typography variant="subtitle1" sx={fontContentStyle}>
                        Click on an order to view details
                      </Typography>
                    </>
                  )}
                </Box>
              )}
            </Box>
          </>
        )}
      </Container>
    </>
  );
}
