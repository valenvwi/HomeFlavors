import { LineChart } from "@mui/x-charts/LineChart";

type Props = {
  time: string;
  name: string;
  quantity: number;
  revenue: string;
}[];

export default function SalesChart(props: { sales: Props }) {
  console.log("SalesChart: ", props.sales);
  const time = props.sales.map((row) => row.time);
  const revenue = props.sales.map((row) => parseFloat(row.revenue));

  console.log("time: ", time);
  console.log("revenue: ", revenue);
  return (
    <LineChart
      xAxis={[{ data: time, scaleType: "band" }]}
      series={[
        {
          id: "revenue",
          data: revenue,
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
