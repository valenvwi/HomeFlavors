import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import kitchenImg from "../../assets/kitchen.jpg";
import { SpaceAroundFlexBox, SpaceBetweenFlexBox } from "../../components";

export default function OurValue() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return isSmallScreen ? (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img
          src={kitchenImg}
          alt="landing"
          style={{
            width: isMediumScreen ? "200px" : "300px",
            height: isMediumScreen ? "200px" : "300px",
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "0px 0px 100px 0px rgba(235, 134, 75, 0.5)",
          }}
        />
      </Box>
      <Box
        sx={{
          mx: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle2" sx={{ mx: 1, mt: 5 }}>
          <b>Freshness First</b>
          <br />
          At Amy's Kitchen, we prioritize the use of fresh, high-quality
          ingredients to ensure every dish is as nutritious as it is flavorful.
        </Typography>
        <Typography variant="subtitle2" sx={{ mx: 1, my: 2 }}>
          <b>Homemade Tradition</b>
          <br />
          We're dedicated to bringing the warmth and comfort of homemade cooking
          to your table, perfect for family gatherings or special occasions.
        </Typography>
        <Typography variant="subtitle2" sx={{ mx: 1, my: 2 }}>
          <b>Culinary Diversity</b>
          <br />
          Our diverse menu reflects a blend of traditional recipes and
          innovative culinary techniques, offering something unique for every
          palate.
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
          borderRadius: "50%",
          objectFit: "cover",
          margin: "0 50px",
          boxShadow: "0px 0px 100px 0px rgba(235, 134, 75, 0.5)",
        }}
      />
      <Box sx={{ mx: 2 }}>
        <Typography variant="subtitle1" sx={{ m: 3 }}>
          <b>Freshness First</b>
          <br />
          At Amy's Kitchen, we prioritize the use of fresh, high-quality
          ingredients to ensure every dish is as nutritious as it is flavorful.
        </Typography>
        <Typography variant="subtitle1" sx={{ m: 3 }}>
          <b>Homemade Tradition</b>
          <br />
          We're dedicated to bringing the warmth and comfort of homemade cooking
          to your table, perfect for family gatherings or special occasions.
        </Typography>
        <Typography variant="subtitle1" sx={{ m: 3 }}>
          <b>Culinary Diversity</b>
          <br />
          Our diverse menu reflects a blend of traditional recipes and
          innovative culinary techniques, offering something unique for every
          palate.
        </Typography>
      </Box>
    </SpaceAroundFlexBox>
  );
}
