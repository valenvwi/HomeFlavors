import { PieChart } from "@mui/x-charts/PieChart";

type OrderStatus = {
  acceptedOrders: number;
  cancelledOrders: number;
  cancelPercentange: number;
};

type Props = {
  orderStatus: OrderStatus;
};
export default function SalesPie(props: Props) {
  return (
    props.orderStatus && (
      <PieChart
        series={[
          {
            data: [
              {
                label: "Accepted orders",
                value: props.orderStatus.acceptedOrders,
                color: "#EA5C2B",
              },
              {
                label: "Cancelled orders",
                value: props.orderStatus.cancelledOrders,
                color: "purple",
              },
            ],
            cx: "82%",
            innerRadius: 40,
            outerRadius: 60,
          },
        ]}
        height={200}
        width={250}
        slotProps={{
          legend: { hidden: true },
        }}
      />
    )
  );
}
