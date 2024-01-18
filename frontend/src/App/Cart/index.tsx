import { Box, Container, Divider, Typography } from "@mui/material";
import CartItemCard from "./CartItemCard";
import { useAppSelector } from "../store/root";
import { CartItemType } from "../types/cartItem";
import { useTheme, useMediaQuery } from "@mui/material";
import emptyCart from "../../assets/empty-cart.png";
import { useNavigate } from "react-router-dom";
import {
  BackgroundContainer,
  BoldTypography,
  ContainedButton,
} from "../../components";

const smallScreenConfig = {
  fontVariant: "subtitle1",
  fontStyle: {
    my: 1,
  },
} as const;

const largeScreenConfig = {
  fontVariant: "h6",
  fontStyle: {
    mt: 2,
    mb: 2,
    mx: 1,
    textAlign: "right",
  },
} as const;

const containerStyle = {
  margin: "90px auto 30px auto",
  pt: 2,
  pb: 5,
  display: "flex",
  flexDirection: "column",
  backgroundColor: "background.paper",
  borderRadius: "30px",
};

const containerWithEmptyCartStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  flexGrow: 1,
  margin: "90px auto",
  py: 5,
  backgroundColor: "background.paper",
  borderRadius: "30px",
};

const emptyCartBoxStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const flexBoxStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mt: 2,
};

export default function Cart() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const style = isSmallScreen ? smallScreenConfig : largeScreenConfig;

  const navigate = useNavigate();

  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);

  const goToMenuPage = () => {
    navigate("/menu");
    window.scrollTo(0, 0);
  };

  const goToCheckoutPage = () => {
    navigate("/checkout");
    window.scrollTo(0, 0);
  };

  return cartItems.length > 0 ? (
    <BackgroundContainer>
      <Container sx={containerStyle}>
        <BoldTypography
          variant={style.fontVariant}
          sx={{ mt: { xs: 0, md: 1 }, mx: 4, textAlign: "left" }}
        >
          Your cart ({totalQuantity})
        </BoldTypography>
        <Box sx={{ flexGrow: isSmallScreen ? 1 : 0 }}>
          {cartItems.map((cartItem: CartItemType) => (
            <CartItemCard key={cartItem.id} cartItem={cartItem} />
          ))}
        </Box>
        {isSmallScreen ? (
          <>
            <Box>
              <Divider sx={{ mt: 3 }} />
              <Box sx={flexBoxStyle}>
                <Box>
                  <Typography variant="body2">Total Price</Typography>
                  <Typography variant="body1" sx={style.fontStyle}>
                    CHF <b>{totalPrice.toFixed(2)}</b>
                  </Typography>
                </Box>
                <Box>
                  <ContainedButton onClick={goToMenuPage}>Back</ContainedButton>
                  <ContainedButton sx={{ m: 1 }} onClick={goToCheckoutPage}>
                    Check out
                  </ContainedButton>
                </Box>
              </Box>
            </Box>
          </>
        ) : (
          <Box sx={{ mx: 1, px: 3 }}>
            <BoldTypography variant={style.fontVariant} sx={style.fontStyle}>
              Total Price: CHF {totalPrice.toFixed(2)}
            </BoldTypography>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <ContainedButton onClick={goToMenuPage}>Back</ContainedButton>
              <ContainedButton sx={{ mx: 1 }} onClick={goToCheckoutPage}>
                Check out
              </ContainedButton>
            </Box>
          </Box>
        )}
      </Container>
    </BackgroundContainer>
  ) : (
    <BackgroundContainer>
      <Container
        sx={{
          ...containerWithEmptyCartStyle,
          width: isSmallScreen ? "80%" : "40%",
        }}
      >
        <Box sx={emptyCartBoxStyle}>
          <img src={emptyCart} alt="empty shopping cart" width="50%" />
          <BoldTypography variant="h5">Your cart is empty</BoldTypography>
          <ContainedButton sx={{ mt: 1 }} onClick={goToMenuPage}>
            Shop now
          </ContainedButton>
        </Box>
      </Container>
    </BackgroundContainer>
  );
}
