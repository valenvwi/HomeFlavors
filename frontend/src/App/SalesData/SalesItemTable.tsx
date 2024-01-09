import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";

const cardStyle = {
  borderRadius: "15px",
};

const tableCellTitleStyle = {
  fontSize: "16px",
  fontWeight: 700,
  color: "white",
};

const tableCellContentStyle = {
  fontSize: "14px",
};

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#fff6f2",
  },
}));

type Props = {
  id: number;
  image: string;
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
              key={row.id}
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
