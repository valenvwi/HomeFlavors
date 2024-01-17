import { Box, Container, Grid, Typography } from "@mui/material";
import { useKitchensRetrieve } from "../../../api";
import { ComponentPropsWithoutRef } from "react";

const FontTitle = ({
  sx,
  ...rest
}: ComponentPropsWithoutRef<typeof Typography>) => (
  <Typography
    variant="subtitle1"
    sx={{
      color: "white",
      ...sx,
    }}
    {...rest}
  />
);

const FontContent = ({
  sx,
  ...rest
}: ComponentPropsWithoutRef<typeof Typography>) => (
  <Typography
    variant="body2"
    sx={{
      color: "white",
      opacity: "0.8",
      textAlign: "center",
      ...sx,
    }}
    {...rest}
  />
);

const boxStyle = {
  backgroundColor: "#402D28",
  mt: 5,
  py: 3,
  borderTop: "1px solid",
  borderColor: "divider",
  zIndex: 2,
};

export default function Footer() {
  const { data: kitchenResponse } = useKitchensRetrieve(1);
  const kitchen = kitchenResponse?.data;

  return (
    <Box sx={boxStyle}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FontTitle>Disclaimer</FontTitle>
            <FontContent>
              This website is created for demo purpose only
              <br />
              Last updated on Jan 2024
            </FontContent>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FontTitle>Contact Us</FontTitle>
            <FontContent>Email: homeFlavor@abc.com</FontContent>
            <FontContent>Phone: {kitchen?.contactNumber}</FontContent>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
