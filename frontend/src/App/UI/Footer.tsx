import { Box, Container, Grid, Typography } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        py: 3,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="white" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="white">
              This website is created by Wai Ian Vong on Jan 2024. This is not a
              real restaurant.
            </Typography>
            <Typography variant="body2" color="white">
              Check out the GitHub repository for this project{" "}
              <Link to="https://github.com/valenvwi/HomeFlavors" >here.</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="white" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="white">
              Bahnhofstrasse 10, Zurich
            </Typography>
            <Typography variant="body2" color="white">
              Email: homeFlavor@abc.com
            </Typography>
            <Typography variant="body2" color="white">
              Phone: +1234561111121
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="white" align="center">
            {"Copyright © "}
            <Link color="inherit" to="https://your-website.com/">
              Home Flavors
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
