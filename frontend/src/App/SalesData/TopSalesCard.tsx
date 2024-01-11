import {
  Box,
  Card,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { BASEURL } from "../../config";

// const cardStyle = {
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
//   pt: 2,
//   m: 2,
//   borderRadius: "15px",
//   backgroundColor: "#fff6f2",
//   position: "relative",
//   overflow: "visible",
// };

const medalStyle = {
  width: "50px",
  height: "50px",
  position: "absolute",
  top: 0,
  right: 0,
  transform: "translate(30%, -30%)",
};

const fontStyle = {
  fontWeight: 700,
  textAlign: "center",
  py: 2,
  px: 2,
};

const smallScreenConfig = {
  cardStyle: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    px: 1,
    m: 2,
    borderRadius: "15px",
    backgroundColor: "#fff6f2",
    position: "relative",
    overflow: "visible",
  },
  imgStyle: {
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    objectFit: "cover",
  },
};

const bigScreenConfig = {
  cardStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    pt: 2,
    m: 2,
    borderRadius: "15px",
    backgroundColor: "#fff6f2",
    position: "relative",
    overflow: "visible",
  },
  imgStyle: {
    borderRadius: "50%",
    width: "120px",
    height: "120px",
    objectFit: "cover",
  },
};

type Props = {
  name: string;
  image: string;
  quantity: number;
  medal: string;
};

export default function TopSalesCard(props: Props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const style = isSmallScreen ? smallScreenConfig : bigScreenConfig;

  return (
    <Grid item sm={3} sx={{ display: "flex", width: "100%" }}>
      <Card sx={style.cardStyle}>
        <Box
          component="img"
          src={`${BASEURL}/${props.image}`}
          alt={props.name}
          sx={style.imgStyle}
        />
        <Box component="img" src={props.medal} alt="gold" sx={medalStyle} />
        <Typography variant="subtitle2" sx={fontStyle}>
          {props.name}
        </Typography>
      </Card>
    </Grid>
  );
}
