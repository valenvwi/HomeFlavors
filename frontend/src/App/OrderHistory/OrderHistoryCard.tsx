import { Box, Button, Card, Typography } from "@mui/material";
import { OrderType } from "../types/order";
import dayjs from "dayjs";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function OrderHistoryCard (props: { order: OrderType } ) {
  const formattedDate = dayjs(props.order.createdAt).format("YYYY-MM-DD HH:mm");
  console.log(props.order);
  return (
    <Card sx={{ display: "flex", justifyContent: "space-between", my: 2, p: 2 }}>
          <Typography variant="h6">{formattedDate}</Typography>
          <Typography variant="h6">{props.order.totalPrice}</Typography>
          <Button>
            <ExpandMoreIcon />
          </Button>
          <Box>
            <Typography variant="h6"></Typography>
          </Box>
    </Card>
  )
}
