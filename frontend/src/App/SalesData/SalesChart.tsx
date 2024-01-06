import { LineChart } from "@mui/x-charts/LineChart";

type salesProps = {
  sales: {
    time: string;
    ordersCount: number;
    quantity: number;
    revenue: string;
  }[];
};

export default function SalesChart(props: { data: string; sales: salesProps }) {
  const dataType = props.data;
  const time = props.sales.map((r) => r.time);
  const data = props.sales.map((d) => parseFloat(d[dataType]));

  return (
    <LineChart
      xAxis={[{ data: time, scaleType: "band" }]}
      series={[
        {
          id: "data",
          data: data,
        },
      ]}
      width={250}
      height={200}
      sx={{
        "& .MuiLineElement-root": {
          stroke: "#EA5C2B",
        },
        "& .MuiMarkElement-root": {
          stroke: "#EA5C2B",
        },
      }}
    />
  );
}
