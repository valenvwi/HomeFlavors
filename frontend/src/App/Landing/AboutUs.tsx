import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import kitchenImg from "../../assets/kitchen.jpg";
import { CenterFlexBox, SpaceAroundFlexBox } from "../../components";
import { ComponentPropsWithoutRef } from "react";

const smallScreenImgStyle = {
  width: "300px",
  height: "300px",
  borderRadius: "0.95",
  objectFit: "cover",
  boxShadow: "0px 0px 100px 0px rgba(235, 134, 75, 0.5)",
  marginBottom: "40px",
} as const;

const SmTypography = ({
  sx,
  ...rest
}: ComponentPropsWithoutRef<typeof Typography>) => (
  <Typography
    variant="subtitle2"
    sx={{ mx: 1, my: 2, color: "#EA5C2B", ...sx }}
    {...rest}
  />
);

const MdTitle = ({
  sx,
  ...rest
}: ComponentPropsWithoutRef<typeof Typography>) => (
  <Typography
    variant="subtitle1"
    sx={{
      color: "#EA5C2B",
      mx: 3,
      mt: 3,
      fontFamily: "Rowdies",
      ...sx,
    }}
    {...rest}
  />
);

const MdContent = ({
  sx,
  ...rest
}: ComponentPropsWithoutRef<typeof Typography>) => (
  <Typography variant="subtitle1" sx={{ mx: 3, mb: 3, ...sx }} {...rest} />
);

type Props = {
  kitchen: {
    address: string;
    contactNumber: string;
    openingHours: string;
  };
};
export default function AboutUs(props: Props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return isSmallScreen ? (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img src={kitchenImg} alt="landing" style={smallScreenImgStyle} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="subtitle2" sx={{ py: 1 }}>
          <b>Address:</b>
          <br />
          {props.kitchen.address}
        </Typography>
        <Typography variant="subtitle2" sx={{ py: 1 }}>
          <b>Contact:</b>
          <br />
          {props.kitchen.contactNumber}
        </Typography>
        <Typography variant="subtitle2" sx={{ py: 1 }}>
          <b>Opening hours:</b>
          <br />
          {props.kitchen.openingHours}
        </Typography>
      </Box>
    </Box>
  ) : (
    <SpaceAroundFlexBox sx={{ p: 2 }}>
      <img
        src={kitchenImg}
        alt="landing"
        style={{
          width: isMediumScreen ? "200px" : "300px",
          height: isMediumScreen ? "200px" : "300px",
          borderRadius: "15px",
          objectFit: "cover",
          margin: "0 50px",
          boxShadow: "0px 0px 100px 0px rgba(235, 134, 75, 0.5)",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="subtitle1" sx={{ py: 1 }}>
          <b>Address:</b>
          <br />
          {props.kitchen.address}
        </Typography>
        <Typography variant="subtitle1" sx={{ py: 1 }}>
          <b>Contact:</b>
          <br />
          {props.kitchen.contactNumber}
        </Typography>
        <Typography variant="subtitle1" sx={{ py: 1 }}>
          <b>Opening hours:</b>
          <br />
          {props.kitchen.openingHours}
        </Typography>
      </Box>
    </SpaceAroundFlexBox>
  );
}
