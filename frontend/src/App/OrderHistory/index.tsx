import { Box, Button, Container, Typography } from "@mui/material";
import { useOrdersList } from "../../../api";
import OrderHistoryCard from "./OrderHistoryCard";
import SuccessCheckoutModal from "../UI/SuccessCheckoutMoal";
import { modalActions } from "../store/modal";
import { useAppDispatch, useAppSelector } from "../store/root";
import noOrder from "../../assets/no-order.png";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
  const { data: orderResponse } = useOrdersList();
  const orders = orderResponse?.data;
  const navigate = useNavigate();

  const isOpened = useAppSelector((state) => state.modal.isOpened);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(modalActions.setIsOpened(false));
  };

  const goToHomePage = () => {
    navigate("/");
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
      <SuccessCheckoutModal open={isOpened} handleClose={handleClose} />
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
          <Typography variant="h5">No orders yet</Typography>
          <Button variant="contained" sx={{ my: 3 }} onClick={goToHomePage}>
            Shop now
          </Button>
        </Box>
      )}
      {orders?.map((order) => (
        <OrderHistoryCard order={order} key={order.id} />
      ))}
    </Container>
  );
}
