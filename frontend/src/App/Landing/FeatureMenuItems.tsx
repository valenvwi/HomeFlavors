import { Box, useMediaQuery, useTheme } from "@mui/material";
import { BoldTypography, GreyTypography, OrangePaper } from "../../components";
import { mdImgStyle } from "../../components/imgStyle";

const smImgStyle = {
  width: "80px",
  height: "80px",
  borderRadius: "10px",
  margin: "10px 0px",
  objectFit: "cover",
  flexShrink: 0,
} as const;

const outerBoxStyle = {
  display: "flex",
  alignItems: "center",
  my: 1,
  px: 1,
} as const;

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
    <OrangePaper sx={outerBoxStyle}>
      <img
        src={props.menuItem.image}
        alt={props.menuItem.name}
        style={isSmallScreen ? smImgStyle : mdImgStyle}
      />
      <Box sx={{ flexGrow: 1, ml: 2, my: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <BoldTypography
            variant={isSmallScreen ? "subtitle2" : "subtitle1"}
            sx={{ pr: 1 }}
          >
            {props.menuItem.name}
          </BoldTypography>
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
