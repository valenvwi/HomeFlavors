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
import Carousel from "react-material-ui-carousel";
import { CenterFlexBox } from "../../components";
import OurValue from "./OurValue";
import BannerSection2 from "./BannerSection2";

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

  return (
    <>
    <BannerSection2 kitchen={kitchen} />
    <Container sx={{ mt: 5 }}>
      {/* {kitchen && <BannerSection kitchen={kitchen} />} */}

      <br />

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

      <br />
      <Divider />

      <Box sx={{ my: 5 }}>
        <Typography sx={isSmallScreen ? fontSmallTitle : fontTitle}>
          Our Values
        </Typography>
        <OurValue />
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
    </Container>
    </>
  );
}
