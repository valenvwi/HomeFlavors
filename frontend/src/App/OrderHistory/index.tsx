import { Container, Typography } from "@mui/material";
import { useOrdersList } from "../../../api";
import OrderHistoryCard from "./OrderHistoryCard";
import SuccessCheckoutModal from "../UI/SuccessCheckoutMoal";
import { modalActions } from "../store/modal";
import { useAppDispatch, useAppSelector } from "../store/root";

export default function OrderHistory() {
  const { data: orderResponse } = useOrdersList();
  const orders = orderResponse?.data;

  const isOpened = useAppSelector((state) => state.modal.isOpened);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(modalActions.setIsOpened(false));
  };

  return (
    <Container sx={{ my: 5, py: 5 }}>
      <SuccessCheckoutModal open={isOpened} handleClose={handleClose} />
      <Typography variant="h4" fontWeight={700}>
        Your orders
      </Typography>
      {orders?.length === 0 && (
        <Typography variant="h5">No orders yet</Typography>
      )}
      {orders?.map((order) => (
        <OrderHistoryCard order={order} key={order.id} />
      ))}
    </Container>
  );
}
