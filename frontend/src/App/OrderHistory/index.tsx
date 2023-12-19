import { useOrdersList } from "../../../api";

export default function OrderHistory() {
  const { data: orderResponse } = useOrdersList();
  const orders = orderResponse?.data;

  return (
    <div>
      <h1>Order History</h1>
      {orders?.map((order) => (
        <div key={order.id}>
          <h2>{order.id}</h2>
          <p>{order.totalPrice}</p>
          <p>{order.createdAt}</p>
        </div>
      ))}
    </div>
  );
}
