import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ComponentPropsWithRef } from "@react-spring/web";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import bannerImg from "../assets/banner1.jpg";

export const BoldTypography = (
  props: ComponentPropsWithoutRef<typeof Typography>
) => <Typography fontWeight={700} {...props} />;

export const GreyTypography = (
  props: ComponentPropsWithoutRef<typeof Typography>
) => <Typography color="#8b8989" {...props} />;

export const GreyBoldTypography = (
  props: ComponentPropsWithoutRef<typeof Typography>
) => <Typography color="#8b8989" fontWeight={700} {...props} />;
export const ContainedButton = ({
  sx,
  ...rest
}: ComponentPropsWithoutRef<typeof Button>) => (
  <Button
    variant="contained"
    sx={{
      textTransform: "none",
      ...sx,
    }}
    {...rest}
  />
);

export const InheritButton = (
  props: ComponentPropsWithoutRef<typeof Button>
) => <Button color="inherit" {...props} />;

export const OrangePaper = ({
  sx,
  ...rest
}: ComponentPropsWithoutRef<typeof Paper>) => (
  <Paper
    elevation={6}
    sx={{
      backgroundColor: "#fff6f2",
      borderRadius: "10px",
      p: 2,
      ...sx,
    }}
    {...rest}
  />
);

export const CenterFlexBox = ({
  sx,
  ...rest
}: ComponentPropsWithoutRef<typeof Box>) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      ...sx,
    }}
    {...rest}
  />
);

export const SpaceBetweenFlexBox = ({
  sx,
  ...rest
}: ComponentPropsWithoutRef<typeof Box>) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      ...sx,
    }}
    {...rest}
  />
);

export const SpaceAroundFlexBox = ({
  sx,
  ...rest
}: ComponentPropsWithoutRef<typeof Box>) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      ...sx,
    }}
    {...rest}
  />
);

export const BackgroundContainer = ({
  sx,
  ...rest
}: ComponentPropsWithoutRef<typeof Box>) => (
  <Box
    sx={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bannerImg})`,
      backgroundSize: "cover",
      flexGrow: 1,
      ...sx,
    }}
    {...rest}
  />
);

export const EmptywithImageContainer = ({
  sx,
  ...rest
}: ComponentPropsWithoutRef<typeof Container>) => (
  <Container
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
      margin: "90px auto",
      py: 5,
      backgroundColor: "background.paper",
      borderRadius: "30px",
      ...sx,
    }}
    {...rest}
  />
);

export const WhiteContainer = ({
  sx,
  ...rest
}: ComponentPropsWithoutRef<typeof Container>) => (
  <Container
    sx={{
      marginTop: "90px",
      marginBottom: "30px",
      width: "90%",
      pt: 2,
      pb: 5,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "background.paper",
      borderRadius: "30px",
      ...sx,
    }}
    {...rest}
  />
);

export const ResponsiveGrid = (
  props: ComponentPropsWithoutRef<typeof Grid>
) => <Grid item xs={12} sm={6} {...props} />;

export const StandardTextField = forwardRef<
  HTMLInputElement,
  ComponentPropsWithRef<typeof TextField>
>((props, ref) => (
  <TextField
    {...props}
    variant="standard"
    sx={{
      width: "90%",
      py: 1,
    }}
    ref={ref}
  />
));

export const FullWidthTextField = forwardRef<
  HTMLInputElement,
  ComponentPropsWithRef<typeof TextField>
>((props, ref) => <TextField {...props} margin="normal" fullWidth ref={ref} />);

export const PrimaryIconButton = ({
  sx,
  ...rest
}: ComponentPropsWithRef<typeof IconButton>) => (
  <IconButton
    color="primary"
    sx={{
      height: " 60px",
      width: "60px",
      position: "absolute",
      right: 0,
      bottom: 5,
      ...sx,
    }}
    {...rest}
  />
);
