import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import { useKitchensRetrieve } from "../../../api";
import {
  BoldTypography,
  ContainedButton,
  GreyTypography,
} from "../../components";
import spicySoup from "../../assets/Korean spicy tofu soup.jpg";
import waterSpinachImg from "../../assets/water spinach.jpg";
import pastaImg from "../../assets/creamy mentaiko pasta.jpg";
import FeatureMenuItem from "./FeatureMenuItems";
import { useNavigate } from "react-router-dom";

const waterSpinach = {
  name: "Stir-fried Water Spinach",
  description:
    "Crisp water spinach and mushrooms stir-fried in a savory bean curd sauce and chili",
  price: 22.5,
  image: waterSpinachImg,
  isVeg: true,
  isSpicy: true,
};

const pasta = {
  name: "Creamy Mentaiko Pasta",
  description:
    "Spicy cod roe blends with creamy sauce for a unique, savory dish",
  price: 16.5,
  image: pastaImg,
  isVeg: false,
  isSpicy: false,
};

const featureMenuItems = [waterSpinach, pasta];

export default function Landing() {
  const { data: kitchenResponse } = useKitchensRetrieve(1);
  const kitchen = kitchenResponse?.data;
  const navigate = useNavigate();

  const goToMenuPage = () => {
    navigate("/menu");
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Box
        sx={{
          mt: 5,
          py: 4,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <BoldTypography variant="h3" sx={{ my: 3 }}>
            {kitchen?.name}
          </BoldTypography>
          {/* <Avatar
            alt="logo"
            src={kitchen?.logo}
            sx={{
              width: 150,
              height: 150,
            }}
          /> */}
          <GreyTypography variant="h5">{kitchen?.description}</GreyTypography>
          <Typography variant="h6" sx={{ my: 3 }}>
            {kitchen?.address}
          </Typography>
          <Typography variant="h6">{kitchen?.openingHours}</Typography>
          <ContainedButton onClick={goToMenuPage} sx={{ my: 3 }}>
            Check out the menu now!
          </ContainedButton>
        </Box>

        <Box>
          <img
            src={spicySoup}
            alt="landing"
            style={{
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "20px",
              boxShadow: "0px 0px 100px 0px rgba(235, 134, 75, 0.5)",
            }}
          />
          {/* <img
            src={pasta}
            alt="landing"
            style={{
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          /> */}
        </Box>
      </Box>
      <Box>
        <Typography>You may like one of these</Typography>
        <Grid container spacing={2}>
          {featureMenuItems.map((menuItem) => (
            <Grid item xs={12} sm={6}>
              <FeatureMenuItem menuItem={menuItem} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
