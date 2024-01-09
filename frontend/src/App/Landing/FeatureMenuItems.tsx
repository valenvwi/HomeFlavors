import { Box, useMediaQuery, useTheme } from "@mui/material";
import { BoldTypography, GreyTypography, OrangePaper } from "../../components";
import { mdImgStyle, smImgStyle } from "../../components/imgStyle";
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
        style={isSmallScreen ? smImgStyle : mdImgStyle}
      />
      <Box sx={{ flexGrow: 1, ml: 2, my: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <BoldTypography
            variant={isSmallScreen ? "subtitle2" : "body1"}
            sx={{ pr: 1 }}
          >
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
