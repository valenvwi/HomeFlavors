import { Container, Typography } from "@mui/material";
import { useOrdersList } from "../../../api";

export default function OrderHistory() {
  const { data: orderResponse } = useOrdersList();
  const orders = orderResponse?.data;

  return (
    <Container sx={{ my: 5, py: 5 }}>
      <Typography variant="h4" fontWeight={700}>
        History
      </Typography>
      {orders?.length === 0 && (
        <Typography variant="h5">No orders yet</Typography>
      )}
      {orders?.map((order) => (
        <div key={order.id}>
          <h2>{order.id}</h2>
          <p>{order.totalPrice}</p>
          <p>{order.createdAt}</p>
        </div>
      ))}
    </Container>
  );
}
