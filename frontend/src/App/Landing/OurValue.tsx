import { Grid } from "@mui/material";
import { titles, descriptions, imgs } from ".././Utils/constants";
import OurValueBox from "./OurValueBox";

export default function OurValue() {
  return (
    <Grid container>
      {titles.map((title, index) => (
        <Grid item xs={12} sm={4} key={title}>
          <OurValueBox
            img={imgs[index]}
            title={title}
            description={descriptions[index]}
          />
        </Grid>
      ))}
    </Grid>
  );
}
