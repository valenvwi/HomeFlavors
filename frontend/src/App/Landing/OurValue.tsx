import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import kitchenImg from "../../assets/kitchen.jpg";
import { CenterFlexBox, SpaceAroundFlexBox } from "../../components";
import { ComponentPropsWithoutRef } from "react";

const smallScreenImgStyle = {
  width: "300px",
  height: "300px",
  borderRadius: "50%",
  objectFit: "cover",
  boxShadow: "0px 0px 100px 0px rgba(235, 134, 75, 0.5)",
  marginBottom: "40px",
} as const;

const SmTypography = ({
  sx,
  ...rest
}: ComponentPropsWithoutRef<typeof Typography>) => (
  <Typography variant="subtitle2" sx={{ mx: 1, my: 2, ...sx }} {...rest} />
);

const MdTypography = ({
  sx,
  ...rest
}: ComponentPropsWithoutRef<typeof Typography>) => (
  <Typography variant="subtitle1" sx={{ m: 3, ...sx }} {...rest} />
);

export default function OurValue() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return isSmallScreen ? (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img src={kitchenImg} alt="landing" style={smallScreenImgStyle} />
      </Box>
      <CenterFlexBox
        sx={{
          mx: 2,
          flexDirection: "column",
        }}
      >
        <SmTypography>
          <b>Freshness First</b>
          <br />
          At Amy's Kitchen, we prioritize the use of fresh, high-quality
          ingredients to ensure every dish is as nutritious as it is flavorful.
        </SmTypography>
        <SmTypography>
          <b>Homemade Tradition</b>
          <br />
          We're dedicated to bringing the warmth and comfort of homemade cooking
          to your table, perfect for family gatherings or special occasions.
        </SmTypography>
        <SmTypography>
          <b>Culinary Diversity</b>
          <br />
          Our diverse menu reflects a blend of traditional recipes and
          innovative culinary techniques, offering something unique for every
          palate.
        </SmTypography>
      </CenterFlexBox>
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
        <MdTypography>
          <b>Freshness First</b>
          <br />
          At Amy's Kitchen, we prioritize the use of fresh, high-quality
          ingredients to ensure every dish is as nutritious as it is flavorful.
        </MdTypography>
        <MdTypography>
          <b>Homemade Tradition</b>
          <br />
          We're dedicated to bringing the warmth and comfort of homemade cooking
          to your table, perfect for family gatherings or special occasions.
        </MdTypography>
        <MdTypography>
          <b>Culinary Diversity</b>
          <br />
          Our diverse menu reflects a blend of traditional recipes and
          innovative culinary techniques, offering something unique for every
          palate.
        </MdTypography>
      </Box>
    </SpaceAroundFlexBox>
  );
}
