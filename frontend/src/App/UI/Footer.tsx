import { Box, Container, Grid, Typography } from "@mui/material";
import { useKitchensRetrieve } from "../../../api";

export default function Footer() {
  const { data: kitchenResponse } = useKitchensRetrieve(1);
  const kitchen = kitchenResponse?.data;

  return (
    <Box
      sx={{
        backgroundColor: "white",
        mt: 5,
        py: 3,
        borderTop: "1px solid",
        borderColor: "divider",
        zIndex: 2,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Typography variant="h6" color="primary.main" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              Disclaimer: This website is created for demo purpose only
            </Typography>
          </Grid>
          {/* <Grid item xs={12} sm={6} sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Typography variant="h6" color="primary.main" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" >
              Email: homeFlavor@abc.com
            </Typography>
            <Typography variant="body2" >
              Phone: {kitchen?.contactNumber}
            </Typography>
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  );
}
