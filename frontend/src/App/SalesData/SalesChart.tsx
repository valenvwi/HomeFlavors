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
  console.log("SalesChart: ", props.sales);
  const dataType = props.data;
  console.log("dataType: ", dataType);
  const time = props.sales.map((r) => r.time);
  const data = props.sales.map((d) => parseFloat(d[dataType]));

  console.log("time: ", time);
  console.log("data: ", data);
  return (
    <LineChart
      xAxis={[{ data: time, scaleType: "band" }]}
      series={[
        {
          id: "data",
          data: data,
        },
      ]}
      width={350}
      height={300}
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
