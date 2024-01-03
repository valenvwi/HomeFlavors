import { Container } from "@mui/material";
import { useOrdersList } from "../../../api/index";
import PendingOrderCard from "./PendingOrderCard";

export default function PendingOrders() {
  const { data: ordersResponse } = useOrdersList({
    kitchen_pending_orders: true,
  });
  const orders = ordersResponse?.data;
  console.log("order:", orders);

  return (
    <Container sx={{ pt: 5 }}>
      <h1>PendingOrders</h1>
      {orders?.map((order) => (
        <PendingOrderCard order={order} />
      ))}
    </Container>
  );
}
