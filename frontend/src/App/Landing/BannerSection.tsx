import { Box, Typography } from "@mui/material";
import { BoldTypography, ContainedButton } from "../../components";
import { useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";
import bannerImg from "../../assets/banner1.jpg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const mediumScreenConfig = {
  fontTitleVariant: "h3",
  fontSubtitleVariant: "body1",
  buttonText: {
    display: "flex",
    alignItems: "center",
    fontSize: "18px",
  },
} as const;

const largeScreenConfig = {
  fontTitleVariant: "h1",
  fontSubtitleVariant: "h5",
  buttonText: {
    display: "flex",
    alignItems: "center",
    fontSize: "22px",
  },
} as const;

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
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bannerImg})`,
        backgroundSize: "cover",
        width: "100%",
        height: "95vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          justifyContent: "center",
          color: "white",
          p: isSmallScreen ? 0 : 6,
          mx: isSmallScreen ? 2 : 6,
        }}
      >
        <BoldTypography variant={style.fontTitleVariant} sx={{ my: 3 }}>
          {props.kitchen?.name}
        </BoldTypography>
        <Typography
          variant={style.fontSubtitleVariant}
          sx={{ textAlign: "center", pt: 5 }}
        >
          {props.kitchen?.description}
        </Typography>
        <ContainedButton onClick={goToMenuPage} sx={{ my: 5, px: 3, py: 1 }}>
          <Typography sx={style.buttonText}>
            Menu
            <ArrowForwardIcon sx={{ ml: 1 }} />
          </Typography>
        </ContainedButton>
      </Box>
    </Box>
  );
}
