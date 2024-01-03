import { Container } from "@mui/material";
import { useOrdersList } from "../../../api/index";
import dayjs from "dayjs";

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
        <div key={order.id}>
          Pick up time: {order.pickUpDate} {order.pickUpTime}
          <br />
          {order.orderItems?.map((orderItem) => (
            <div key={orderItem.id}>
              {orderItem.menuItem.name} {orderItem.quantity}
            </div>
          ))}
          Total price: CHF {order.totalPrice}
          Order created at {dayjs(order.createdAt).format("YYYY-MM-DD HH:mm")}
        </div>
      ))}
    </Container>
  );
}
