import { Box, Button, Container, Typography } from "@mui/material";
import { ordersPartialUpdate, useOrdersList } from "../../../api";
import OrderHistoryCard from "./OrderHistoryCard";
import { modalActions } from "../store/modal";
import { useAppDispatch, useAppSelector } from "../store/root";
import noOrder from "../../assets/no-order.png";
import { useNavigate } from "react-router-dom";
import SuccessCheckoutModal from "../UI/SuccessCheckoutMoal";
import SuccessCancellationModal from "../UI/SuccessCancellationModal";

const fontStyle = {
  fontWeight: 700,
  my: 1,
};

export default function OrderHistory() {
  const { data: orderResponse } = useOrdersList();
  const orders = orderResponse?.data;
  const navigate = useNavigate();

  const { data: pendingOrdersResponse, refetch: refetchPendingOrder } =
    useOrdersList({
      user_pending_orders: true,
    });

  const pendingOrders = pendingOrdersResponse?.data;

  const { data: acceptedOrdersResponse, refetch: refetchAcceptedOrder } =
    useOrdersList({
      user_pending_orders: false,
    });

  const acceptedOrders = acceptedOrdersResponse?.data;

  function pluralize(count: number, singularWord: string) {
    return count === 1 ? singularWord : singularWord + "s";
  }

  const isCheckedout = useAppSelector((state) => state.modal.isCheckedout);
  const isCancelled = useAppSelector((state) => state.modal.isCancelled);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(modalActions.setIsCheckedout(false));
    dispatch(modalActions.setIsCancelled(false));
  };

  const goToHomePage = () => {
    navigate("/");
  };

  const cancelOrder = async (orderId: number) => {
    await ordersPartialUpdate(orderId, {
      isCancelled: true,
    });
    dispatch(modalActions.setIsCancelled(true));
    refetchPendingOrder();
    refetchAcceptedOrder();
  };
  return (
    <Container
      sx={{
        my: 5,
        py: 5,
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SuccessCheckoutModal open={isCheckedout} handleClose={handleClose} />
      <SuccessCancellationModal open={isCancelled} handleClose={handleClose} />
      {orders?.length === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: "1",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={noOrder} alt="Sold Out" width="250" />
          <Typography variant="h5" fontWeight={700}>
            No orders yet
          </Typography>
          <Button variant="contained" sx={{ my: 3 }} onClick={goToHomePage}>
            Shop now
          </Button>
        </Box>
      )}

      {pendingOrders !== undefined && pendingOrders?.length > 0 && (
        <>
          <Typography variant="h6" sx={fontStyle}>
            {" "}
            Pending {pluralize(pendingOrders?.length || 0, "Order")} (
            {pendingOrders?.length})
          </Typography>
          {pendingOrders?.map((order) => (
            <OrderHistoryCard
              order={order}
              key={order.id}
              cancelOrder={cancelOrder}
            />
          ))}
        </>
      )}

      {acceptedOrders !== undefined && acceptedOrders?.length > 0 && (
        <>
          <Typography variant="h6" sx={fontStyle}>
            {" "}
            All {pluralize(acceptedOrders?.length || 0, "Order")} (
            {acceptedOrders?.length})
          </Typography>
          {acceptedOrders?.map((order) => (
            <OrderHistoryCard order={order} key={order.id} />
          ))}
        </>
      )}
    </Container>
  );
}
