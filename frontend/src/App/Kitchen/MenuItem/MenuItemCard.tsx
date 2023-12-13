import { Box, Button, Card, Typography } from "@mui/material";
import { MenuItemType } from "../../types/menuItem";
import { BASEURL } from "../../../config";
import spicyIcon from "../../../assets/spicy.jpg";
import vegIcon from "../../../assets/veg.png";

export default function MenuItemCard(props: {
  menuItem: MenuItemType;
  isOwner: boolean;
}) {
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
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography variant="h5">{props.menuItem.name}</Typography>
          {props.menuItem.isSpicy && (
            <img src={spicyIcon} alt="Spicy icon" width="50" height="50" />
          )}
          {props.menuItem.isVeg && (
            <img src={vegIcon} alt="Vegetarian icon" width="25" height="25" />
          )}
        </Box>
        <Typography variant="subtitle1">
          {props.menuItem.description}
        </Typography>
        <Typography variant="h6">{props.menuItem.price}</Typography>
      </Box>
      {props.isOwner ? (
        <Button variant="contained" color="primary">
          Edit
        </Button>
      ) : (
        <Button variant="contained" color="primary">
          Add to Cart
        </Button>
      )}
    </Card>
  );
}
