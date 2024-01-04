import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";

const rows = [
  { name: "Wintermelon Soup", quantity: 10, price: 20 },
  { name: "Chicken Rice", quantity: 20, price: 30 },
  { name: "Mango Juice", quantity: 10, price: 5 },
];

const cardStyle = {
  borderRadius: "15px",
};

const tableCellTitleStyle = {
  fontSize: "18px",
  fontWeight: 700,
  color: "white",
};

const tableCellContentStyle = {
  fontSize: "16px",
};

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#fff6f2",
  },
}));

type Props = {
  name: string;
  quantity: number;
  revenue: string;
}[];

export default function SalesItemTable(props: { sales: Props }) {
  return (
    <TableContainer style={cardStyle} sx={{ my: 4 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#EA5C2B" }}>
          <TableRow>
            <TableCell style={tableCellTitleStyle}>Menu Item</TableCell>
            <TableCell style={tableCellTitleStyle} align="right">
              Item sold
            </TableCell>
            <TableCell style={tableCellTitleStyle} align="right">
              Item Revenue (CHF)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.sales.map((row) => (
            <StyledTableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                style={tableCellContentStyle}
              >
                {row.name}
              </TableCell>
              <TableCell align="right" style={tableCellContentStyle}>
                {row.quantity}
              </TableCell>
              <TableCell align="right" style={tableCellContentStyle}>
                {parseFloat(row.revenue).toFixed(2)}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
