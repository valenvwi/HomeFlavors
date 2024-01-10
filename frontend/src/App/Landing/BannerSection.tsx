import { Box, Grid, Typography } from "@mui/material";
import {
  BoldTypography,
  ContainedButton,
  GreyTypography,
  SpaceAroundFlexBox,
} from "../../components";
import spicySoup from "../../assets/Korean spicy tofu soup.jpg";
import { useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";

type Props = {
  kitchen: {
    name: string;
    logo: string;
    description: string;
    address: string;
    openingHours: string;
    contactNumber: string;
  };
};
export default function BannerSection(props: Props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const goToMenuPage = () => {
    navigate("/menu");
  };
  return (
    <Grid
      container
      sx={{
        margin: { sm: "120px 0" },
        minHeight: { xs: "95vh", sm: 0 },
        display: { xs: "flex" },
        py: 5,
      }}
    >
      {isSmallScreen ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <BoldTypography
              variant={isMediumScreen ? "h5" : "h3"}
              sx={{ my: 3 }}
            >
              {props.kitchen?.name}
            </BoldTypography>
            <GreyTypography variant={isMediumScreen ? "body1" : "h5"}>
              {props.kitchen?.description}
            </GreyTypography>
            <ContainedButton onClick={goToMenuPage} sx={{ my: 5 }}>
              Check out our menu
            </ContainedButton>
          </Box>

          <SpaceAroundFlexBox
            sx={{
              width: "100%",
            }}
          >
            <img
              src={spicySoup}
              alt="landing"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "20px",
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
          </SpaceAroundFlexBox>
        </Box>
      ) : (
        <>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <BoldTypography
                variant={isMediumScreen ? "h5" : "h3"}
                sx={{ pb: 10 }}
              >
                {props.kitchen?.name}
              </BoldTypography>
              <GreyTypography variant={isMediumScreen ? "body1" : "h5"}>
                {props.kitchen?.description}
              </GreyTypography>
              <ContainedButton onClick={goToMenuPage} sx={{ my: 3 }}>
                Check out our menu
              </ContainedButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <img
              src={spicySoup}
              alt="landing"
              style={{
                width: isMediumScreen ? "200px" : "260px",
                height: isMediumScreen ? "200px" : "260px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "20px",
                boxShadow: "0px 0px 100px 0px rgba(235, 134, 75, 0.5)",
              }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant={isMediumScreen ? "subtitle2" : "subtitle1"}
              sx={{ py: 1 }}
            >
              <b>Address:</b>
              <br />
              {props.kitchen.address}
            </Typography>
            <Typography
              variant={isMediumScreen ? "subtitle2" : "subtitle1"}
              sx={{ py: 1 }}
            >
              <b>Contact:</b>
              <br />
              {props.kitchen.contactNumber}
            </Typography>
            <Typography
              variant={isMediumScreen ? "subtitle2" : "subtitle1"}
              sx={{ py: 1 }}
            >
              <b>Opening hours:</b>
              <br />
              {props.kitchen.openingHours}
            </Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
}
