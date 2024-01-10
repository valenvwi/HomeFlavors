import { Box, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useKitchensRetrieve } from "../../../api";

export default function Footer() {
  const { data: kitchenResponse } = useKitchensRetrieve(1);
  const kitchen = kitchenResponse?.data;

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        mt: 5,
        py: 3,
        borderTop: "1px solid",
        borderColor: "divider",
        zIndex: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="white" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="white">
              This website is created by Wai Ian Vong on Jan 2024.
            </Typography>
            <Typography variant="body2" color="white">
              Check out the GitHub repository for this project{" "}
              <Link to="https://github.com/valenvwi/HomeFlavors">here.</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="white" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="white">
              Email: homeFlavor@abc.com
            </Typography>
            <Typography variant="body2" color="white">
              Phone: {kitchen?.contactNumber}
            </Typography>
          </Grid>
        </Grid>
        <Box mt={3}>
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
