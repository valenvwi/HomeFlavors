import { Box, Button, Card, Typography } from "@mui/material";
import { MenuItemType } from "../../types/menuItem";
import { BASEURL } from "../../../config";

export default function MenuItemCard(props: { menuItem: MenuItemType }) {
  return (
    <Card sx={{ display: "flex", m: 2, p: 2 }}>
      <img
        src={`${BASEURL}/${props.menuItem.image}`}
        alt={props.menuItem.name}
        style={{
          width: "200px",
          height: "200px",
          objectFit: "cover",
          borderRadius: "10px",
          aspectRatio: "1",
        }}
      />
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <Typography variant="h5">{props.menuItem.name}</Typography>
        <Typography variant="subtitle1">
          {props.menuItem.description}
        </Typography>
        <Typography variant="h6">{props.menuItem.price}</Typography>
      </Box>
      <Button variant="contained" color="primary">
        Add to Cart
      </Button>
    </Card>
  );
}
