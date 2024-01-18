import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ComponentPropsWithoutRef } from "react";
import aboutUsImg from "../../assets/aboutUsLocation.jpg";
import contactIcon from "../../assets/aboutUsIcons/contact.png";
import locationIcon from "../../assets/aboutUsIcons/location.png";
import openingHoursIcon from "../../assets/aboutUsIcons/openingHours.png";
import emailIcon from "../../assets/aboutUsIcons/email.png";

const fontTitle = {
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "36px",
  textAlign: "center",
  lineHeight: "54px",
  my: 1,
};

const fontSmallTitle = {
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "20px",
  textAlign: "center",
  lineHeight: "36px",
  my: 2,
};

const MdContent = ({
  sx,
  ...rest
}: ComponentPropsWithoutRef<typeof Typography>) => (
  <Typography variant="subtitle1" sx={{ mx: 3, ...sx }} {...rest} />
);

type Props = {
  kitchen: {
    address: string;
    contactNumber: string;
    openingHours: string;
  };
};

export default function FindUs(props: Props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const icons = [openingHoursIcon, locationIcon, contactIcon, emailIcon];
  const contents = [
    props.kitchen.openingHours,
    props.kitchen.address,
    props.kitchen.contactNumber,
    "homeFlavors@abc.com",
  ];

  console.log("props.kitchen", props.kitchen);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <Box
          component="img"
          src={aboutUsImg}
          sx={{ width: "100%", borderRadius: "20px" }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: isMediumScreen ? "center" : "flex-start",
          ml: isMediumScreen ? 0 : 6,
        }}
      >
        <Typography sx={isSmallScreen ? fontSmallTitle : fontTitle}>
          Find us
        </Typography>
        {props.kitchen &&
          icons.map((icon, index) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                py: isMediumScreen ? 1 : 2,
              }}
              key={`${icon}-${index}`}
            >
              <img src={icon} alt="fresh" style={{ width: "40px" }} />
              <MdContent>{contents[index]}</MdContent>
            </Box>
          ))}
      </Grid>
    </Grid>
  );
}
