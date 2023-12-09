import { useAuthStore } from "../store/auth";
import { kitchensRetrieve } from "../../../api";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Box, Typography } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

type Kitchen = {
  address: string;
  banner?: string;
  contactNumber: string;
  cuisine: string;
  description: string;
  logo?: string;
  name: string;
  openingHours: string;
  orderAcceptTime: string;
  owner: number;
};

export default function Kitchen() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const [kitchen, setKitchen] = useState<Kitchen>();

  const getKitchen = async () => {
    const response = await kitchensRetrieve(1);
    if (!response) {
      console.log("error");
      return;
    }
    setKitchen(response.data);
  };

  useEffect(() => {
    getKitchen();
  }, []);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  console.log("is logged in: ", isLoggedIn);
  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-end",
          backgroundImage: `url(${kitchen?.banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "300px",
        }}
      >
        <Avatar
          alt="logo"
          src={kitchen?.logo}
          sx={{
            transform: "translateY(10%)",
            width: 150,
            height: 150,
          }}
        />
      </Box>
      <Box
        sx={{
          mx: 3,
          my: 2,
          display: isSmallScreen ? "flex" : "block",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h4">{kitchen?.name}</Typography>
          <Typography variant="h6">Cuisine: {kitchen?.cuisine}</Typography>
          <Typography variant="subtitle1">{kitchen?.description}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">{kitchen?.address}</Typography>
          <Typography variant="subtitle1">
            Contact Number: {kitchen?.contactNumber}
          </Typography>
          <Typography variant="subtitle1">
            Opening Hours: {kitchen?.openingHours}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
