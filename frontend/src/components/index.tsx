import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ComponentPropsWithRef } from "@react-spring/web";
import { ComponentPropsWithoutRef, forwardRef } from "react";

export const BoldTypography = (
  props: ComponentPropsWithoutRef<typeof Typography>
) => <Typography fontWeight={700} {...props} />;

export const GreyTypography = (
  props: ComponentPropsWithoutRef<typeof Typography>
) => <Typography color="#8b8989" {...props} />;

export const ContainedButton = (
  props: ComponentPropsWithoutRef<typeof Button>
) => <Button variant="contained" {...props} />;

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
    sx={{ height: " 60px", width: "60px", ...sx }}
    {...rest}
  />
);

export const smImgStyle = {
  width: "50px",
  height: "50px",
  borderRadius: "10px",
} as const;

export const mdImgStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "10px",
} as const;

export const lgImgStyle = {
  width: "150px",
  height: "150px",
  objectFit: "cover",
  borderRadius: "10px",
  aspectRatio: "1",
  margin: "0 auto",
} as const;
