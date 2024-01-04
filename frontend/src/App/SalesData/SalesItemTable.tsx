import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const rows = [
  { name: "Wintermelon Soup", quantity: 10, price: 20 },
  { name: "Chicken Rice", quantity: 20, price: 30 },
  { name: "Mango Juice", quantity: 10, price: 5 },
];

const cardStyle = {
  borderRadius: "15px",
  backgroundColor: "#fff6f2",
};

const tableCellTitleStyle = {
  fontSize: "18px",
  fontWeight: 700,
  color: "#8b8989",
};

type Props = {
  name: string;
  quantity: number;
  revenue: string;
}[];

export default function SalesItemTable(props: { sales: Props }) {
  return (
    <TableContainer style={cardStyle} sx={{ my: 4 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={tableCellTitleStyle}>Menu Item</TableCell>
            <TableCell style={tableCellTitleStyle} align="right">
              Item sold
            </TableCell>
            <TableCell style={tableCellTitleStyle} align="right">
              Item Revenue
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.sales.map((row) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">CHF {row.revenue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
