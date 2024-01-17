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
import { useKitchensRetrieve } from "../../../api";
import ReviewCard from "./ReviewCard";
import { reviews } from "../Utils/constants";
import Carousel from "react-material-ui-carousel";
import { CenterFlexBox, ContainedButton } from "../../components";
import BannerSection from "./BannerSection";
import AboutUs from "./AboutUs";
import OurValue from "./OurValue";
import { useNavigate } from "react-router-dom";

const fontTitle = {
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "36px",
  textAlign: "center",
  lineHeight: "54px",
  mt: 2,
  mb: 5,
};

const fontSmallTitle = {
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "20px",
  textAlign: "center",
  lineHeight: "36px",
  my: 2,
};

const splitArrayTwoByTwo = <T,>(array: T[]) => {
  const result = [];
  for (let i = 0; i < array.length; i += 2) {
    result.push(array.slice(i, i + 2));
  }
  return result;
};

export default function Landing() {
  const { data: kitchenResponse } = useKitchensRetrieve(1);
  const kitchen = kitchenResponse?.data;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const goToMenuPage = () => {
    navigate("/menu");
    window.scrollTo(0, 0);
  };

  return (
    <>
      <BannerSection kitchen={kitchen} />
      <Container sx={{ mt: 5 }}>
        <Box sx={{ my: 5 }}>
          <OurValue />
        </Box>

        <br />
        <Divider />

        <Box
          sx={{
            my: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "cewnter",
          }}
        >
          <Typography sx={isSmallScreen ? fontSmallTitle : fontTitle}>
            Our Speciality
          </Typography>
          <Grid container spacing={2}>
            {featureMenuItems.map((menuItem) => (
              <Grid item xs={12} sm={6} md={3} key={menuItem.name}>
                <FeatureMenuItem menuItem={menuItem} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ margin: "0 auto" }}>
            <ContainedButton
              onClick={goToMenuPage}
              sx={{ mt: 1, px: 3, py: 1 }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                }}
              >
                View All
              </Typography>
            </ContainedButton>
          </Box>
        </Box>

        <br />
        <Divider />

        <Box sx={{ py: 2 }}>
          <Typography sx={isSmallScreen ? fontSmallTitle : fontTitle}>
            Customer Reviews
          </Typography>
          <Grid container spacing={1}>
            {isSmallScreen ? (
              <Carousel sx={{ margin: "20px auto", width: "100%" }}>
                {reviews.map((review) => (
                  <Grid item xs={12} key={review.reviewer}>
                    <ReviewCard review={review} />
                  </Grid>
                ))}
              </Carousel>
            ) : (
              <Carousel swipe sx={{ margin: "20px auto", width: "100%" }}>
                {splitArrayTwoByTwo(reviews).map(([review1, review2]) => (
                  <CenterFlexBox key={review1.reviewer}>
                    <Grid item xs={12} sm={5}>
                      <ReviewCard review={review1} />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <ReviewCard review={review2} />
                    </Grid>
                  </CenterFlexBox>
                ))}
              </Carousel>
            )}
          </Grid>
        </Box>

        <br />
        <Divider />

        <Box sx={{ my: 5 }}>
          <Typography sx={isSmallScreen ? fontSmallTitle : fontTitle}>
            About us
          </Typography>
          <AboutUs kitchen={kitchen} />
        </Box>
      </Container>
    </>
  );
}
