import { Box, useMediaQuery, useTheme } from "@mui/material";
import { BoldTypography, GreyTypography } from "../../components";
import { lgImgStyle } from "../../components/imgStyle";

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
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <img
        src={props.menuItem.image}
        alt={props.menuItem.name}
        style={lgImgStyle}
      />
      <Box sx={{ mx: isMediumScreen ? 2 : 0 }}>
        <BoldTypography variant="subtitle1" sx={{ mt: 2, pb: 1 }}>
          {" "}
          {props.menuItem.name}
        </BoldTypography>
        <GreyTypography variant="body2">
          {" "}
          {props.menuItem.description}
        </GreyTypography>
        <BoldTypography variant="subtitle1" sx={{ mt: 1, mb: 2 }}>
          {" "}
          CHF {props.menuItem.price}
        </BoldTypography>
      </Box>
    </Box>
  );
}
