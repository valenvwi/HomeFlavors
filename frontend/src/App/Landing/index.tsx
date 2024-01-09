import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { featureMenuItems } from "../Utils/constants";
import FeatureMenuItem from "./FeatureMenuItems";
import BannerSection from "./BannerSection";
import { useKitchensRetrieve } from "../../../api";
import ReviewCard from "./ReviewCard";
import { reviews } from "../Utils/constants";

const fontTitle = {
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "36px",
  textAlign: "center",
  lineHeight: "54px",
  my: 2,
};

const fontSmallTitle = {
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "20px",
  textAlign: "center",
  lineHeight: "36px",
  my: 2,
};

export default function Landing() {
  const { data: kitchenResponse } = useKitchensRetrieve(1);
  const kitchen = kitchenResponse?.data;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container sx={{ mt: 5 }}>
      {kitchen && <BannerSection kitchen={kitchen} />}

      {isSmallScreen && <Divider />}

      <Box sx={{ my: 5 }}>
        <Typography sx={isSmallScreen ? fontSmallTitle : fontTitle}>
          Our Speciality
        </Typography>
        <Grid container spacing={2}>
          {featureMenuItems.map((menuItem) => (
            <Grid item xs={12} sm={6} key={menuItem.name}>
              <FeatureMenuItem menuItem={menuItem} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {isSmallScreen && <Divider />}

      <Box sx={{ py: 2 }}>
        <Typography sx={isSmallScreen ? fontSmallTitle : fontTitle}>
          Customer Reviews
        </Typography>
        <Grid container spacing={2}>
          {reviews.map((review) => (
            <Grid item xs={12} sm={6} md={3} key={review.reviewer}>
              <ReviewCard review={review} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
