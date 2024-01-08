import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { ComponentPropsWithoutRef } from "react";

export const BoldTypography = (
  props: ComponentPropsWithoutRef<typeof Typography>
) => <Typography fontWeight={700} {...props} />;

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

export const ResponsiveGrid = (
  props: ComponentPropsWithoutRef<typeof Grid>
) => <Grid item xs={12} sm={6} {...props} />;

export const StandardTextField = (
  props: ComponentPropsWithoutRef<typeof TextField>
) => (
  <TextField
    {...props}
    variant="standard"
    sx={{
      width: "90%",
      py: 1,
    }}
  />
);
