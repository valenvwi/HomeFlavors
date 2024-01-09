import { Box, Button } from "@mui/material";
import {
  BoldTypography,
  GreyTypography,
  OrangePaper,
} from "../../components";
import { BASEURL } from "../../config";
import { mdImgStyle } from "../../components/imgStyle";
import vegIcon from "../../assets/veg.png";
import spicyIcon from "../../assets/spicy.png";

type Props = {
  menuItem: {
    name: string;
    description: string;
    price: number;
    image: string;
    isVeg: boolean;
    isSpicy: boolean;
  };
};
export default function FeatureMenuItem(props: Props) {
  return (
    <OrangePaper
      sx={{
        display: "flex",
        m: 2,
      }}
    >
      <img
        src={props.menuItem.image}
        alt={props.menuItem.name}
        style={mdImgStyle}
      />
      <Box sx={{ flexGrow: 1, ml: 2, my: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <BoldTypography variant="body1" sx={{ pr: 1 }}>
            {props.menuItem.name}
          </BoldTypography>
          {props.menuItem.isVeg && (
            <img src={vegIcon} alt="Vegetarian icon" width="20" height="20" />
          )}
          {props.menuItem.isSpicy && (
            <img src={spicyIcon} alt="Spicy icon" width="25" height="25" />
          )}
        </Box>
        <GreyTypography variant="body2">
          {props.menuItem.description}
        </GreyTypography>
        <BoldTypography variant="subtitle2">
          CHF {props.menuItem.price}
        </BoldTypography>
      </Box>

    </OrangePaper>
  );
}
