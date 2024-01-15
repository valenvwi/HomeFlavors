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
          <b>Freshness First123</b>
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
        <MdTitle>Freshness First </MdTitle>
        <MdContent>
          At Amy's Kitchen, we prioritize the use of fresh, high-quality
          ingredients to ensure every dish is as nutritious as it is flavorful.
        </MdContent>
        <MdTitle>Homemade Tradition </MdTitle>
        <MdContent>
          We're dedicated to bringing the warmth and comfort of homemade cooking
          to your table, perfect for family gatherings or special occasions.
        </MdContent>

        <MdTitle>Culinary Diversity </MdTitle>
        <MdContent>
          Our diverse menu reflects a blend of traditional recipes and
          innovative culinary techniques, offering something unique for every
          palate.
        </MdContent>
      </Box>
    </SpaceAroundFlexBox>
  );
}
