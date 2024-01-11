import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const cardStyle = {
  borderRadius: "15px",
};

const smallScreenConfig = {
  tableCellTitleStyle: {
    fontSize: "14px",
    fontWeight: 700,
    color: "white",
  },
  tableCellContentStyle: {
    fontSize: "12px",
  },
};

const bigScreenConfig = {
  tableCellTitleStyle: {
    fontSize: "16px",
    fontWeight: 700,
    color: "white",
  },
  tableCellContentStyle: {
    fontSize: "14px",
  },
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const style = isSmallScreen ? smallScreenConfig : bigScreenConfig;

  return (
    <TableContainer style={cardStyle} sx={{ my: 4 }}>
      <Table aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#EA5C2B" }}>
          <TableRow>
            <TableCell style={style.tableCellTitleStyle}>Menu Item</TableCell>
            <TableCell style={style.tableCellTitleStyle} align="right">
              Item sold
            </TableCell>
            <TableCell style={style.tableCellTitleStyle} align="right">
              Revenue (CHF)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.sales.map((row) => (
            <StyledTableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              key={`item` + row.id}
            >
              <TableCell
                component="th"
                scope="row"
                style={style.tableCellContentStyle}
              >
                {row.name}
              </TableCell>
              <TableCell align="right" style={style.tableCellContentStyle}>
                {row.quantity}
              </TableCell>
              <TableCell align="right" style={style.tableCellContentStyle}>
                {parseFloat(row.revenue).toFixed(2)}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
