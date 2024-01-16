import { Grid } from "@mui/material";
import freshImg from "../../assets/valueIcons/fresh.png";
import homemadeImg from "../../assets/valueIcons/cooking.png";
import diversityImg from "../../assets/valueIcons/cutlery.png";
import OurValueBox from "./OurValueBox";

const titles = ["Freshness First", "Homemade Tradition", "Culinary Diversity"];
const descriptions = [
  "At Amy's Kitchen, we prioritize the use of fresh, high-quality ingredients to ensure every dish is as nutritious as it is flavorful",
  "We're dedicated to bringing the warmth and comfort of homemade cooking to your table, perfect for family gatherings or special occasions",
  "Our diverse menu reflects a blend of traditional recipes and innovative culinary techniques, offering something unique for every palate",
];
const imgs = [freshImg, homemadeImg, diversityImg];

export default function OurValue() {
  return (
    <Grid container>
      {titles.map((title, index) => (
        <Grid item xs={12} sm={4}>
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
