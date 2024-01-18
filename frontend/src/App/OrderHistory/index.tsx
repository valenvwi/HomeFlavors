import { Container } from "@mui/material";
import { ordersPartialUpdate, useOrdersList } from "../../../api";
import OrderHistoryCard from "./OrderHistoryCard";
import { modalActions } from "../store/modal";
import { useAppDispatch, useAppSelector } from "../store/root";
import noOrder from "../../assets/no-order.png";
import { useNavigate } from "react-router-dom";
import Modal from "../UI/Modal";
import { useState } from "react";
import {
  BackgroundContainer,
  BoldTypography,
  ContainedButton,
} from "../../components";

const containerStyle = {
  mt: 5,
  py: 5,
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
};

export default function OrderHistory() {
  const { data: orderResponse } = useOrdersList();
  const orders = orderResponse?.data;
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState<number>(0);

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
  const openCancelledDialog = useAppSelector(
    (state) => state.modal.openCancelledDialog
  );

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(modalActions.setIsCheckedout(false));
    dispatch(modalActions.setIsCancelled(false));
    dispatch(modalActions.setOpenCancelledDialog(false));
  };

  const goToMenuPage = () => {
    navigate("/menu");
  };

  const openCancelOrderDialog = (orderId: number) => {
    dispatch(modalActions.setOpenCancelledDialog(true));
    setOrderId(orderId);
  };

  const cancelOrder = async (orderId: number) => {
    console.log("cancelOrder");
    await ordersPartialUpdate(orderId, {
      isCancelled: true,
    });
    dispatch(modalActions.setOpenCancelledDialog(false));
    dispatch(modalActions.setIsCancelled(true));
    refetchPendingOrder();
    refetchAcceptedOrder();
  };
  return (
    <BackgroundContainer>
      <Container sx={containerStyle}>
        <Modal
          open={isCheckedout}
          handleClose={handleClose}
          message="Your order has been placed successfully!"
          cancelText="Close"
          icon="success"
        />

        <Modal
          open={isCancelled}
          handleClose={handleClose}
          message="Your order has been cancelled successfully!"
          cancelText="Close"
          icon="success"
        />
        <Modal
          open={openCancelledDialog}
          message="Are you sure you want to cancel this order?"
          confirmText="Yes"
          cancelText="No"
          handleConfirm={() => cancelOrder(orderId)}
          handleClose={handleClose}
          icon="alert"
        />
        {(orders?.length === 0 ||
          (orders?.length !== 0 &&
            acceptedOrders?.length === 0 &&
            pendingOrders?.length === 0)) && (
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flexGrow: 1,
              alignItems: "center",
            }}
          >
            <img src={noOrder} alt="Sold Out" width="250" />
            <BoldTypography variant="h5">No orders yet</BoldTypography>
            <ContainedButton sx={{ mt: 3, mb: 2 }} onClick={goToMenuPage}>
              Shop now
            </ContainedButton>
          </Container>
        )}

        {pendingOrders !== undefined && pendingOrders?.length > 0 && (
          <>
            <BoldTypography variant="h6" sx={{ my: 1, color: "white" }}>
              {" "}
              Pending {pluralize(pendingOrders?.length || 0, "Order")} (
              {pendingOrders?.length})
            </BoldTypography>
            {pendingOrders?.map((order) => (
              <OrderHistoryCard
                order={order}
                key={order.id}
                openCancelOrderDialog={openCancelOrderDialog}
              />
            ))}
          </>
        )}

        {acceptedOrders !== undefined && acceptedOrders?.length > 0 && (
          <>
            <BoldTypography variant="h6" sx={{ my: 1, color: "white" }}>
              {" "}
              All {pluralize(acceptedOrders?.length || 0, "Order")} (
              {acceptedOrders?.length})
            </BoldTypography>
            {acceptedOrders?.map((order) => (
              <OrderHistoryCard order={order} key={order.id} />
            ))}
          </>
        )}
      </Container>
    </BackgroundContainer>
  );
}
