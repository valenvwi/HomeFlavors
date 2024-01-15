import { Box, Grid, Typography } from "@mui/material";
import {
  BoldTypography,
  CenterFlexBox,
  ContainedButton,
  GreyTypography,
  SpaceAroundFlexBox,
} from "../../components";
import spicySoup from "../../assets/Korean spicy tofu soup.jpg";
import { useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";

const imgStyle = {
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  objectFit: "cover",
  marginRight: "20px",
  boxShadow: "0px 0px 100px 0px rgba(235, 134, 75, 0.5)",
} as const;

const mediumScreenConfig = {
  fontTitleVariant: "h5",
  fontSubtitleVariant: "body1",
  fontContentVariant: "body2",
} as const;

const largeScreenConfig = {
  fontTitleVariant: "h3",
  fontSubtitleVariant: "h5",
  fontContentVariant: "body1",
} as const;

const gridStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

type Props = {
  kitchen: {
    name: string;
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

  const style = isMediumScreen ? mediumScreenConfig : largeScreenConfig;

  const goToMenuPage = () => {
    navigate("/menu");
    window.scrollTo(0, 0);
  };
  return (
    <Grid
      container
      sx={{
        margin: { sm: "120px 0" },
        minHeight: { xs: "90vh", sm: 0 },
        display: { xs: "flex" },
        py: 5,
      }}
    >
      {isSmallScreen ? (
        <CenterFlexBox
          sx={{
            flexDirection: "column",
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
              sx={{ my: 3, fontFamily: "Rowdies" }}
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
            <img src={spicySoup} alt="landing" style={imgStyle} />

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
        </CenterFlexBox>
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
                variant={style.fontTitleVariant}
                sx={{ pb: 10, fontFamily: "Rowdies" }}
              >
                {props.kitchen?.name}
              </BoldTypography>
              <GreyTypography variant={style.fontSubtitleVariant}>
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

          <Grid item xs={12} sm={2} sx={gridStyle}>
            <Typography variant={style.fontContentVariant} sx={{ py: 1 }}>
              <b>Address:</b>
              <br />
              {props.kitchen.address}
            </Typography>
            <Typography variant={style.fontContentVariant} sx={{ py: 1 }}>
              <b>Contact:</b>
              <br />
              {props.kitchen.contactNumber}
            </Typography>
            <Typography variant={style.fontContentVariant} sx={{ py: 1 }}>
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
