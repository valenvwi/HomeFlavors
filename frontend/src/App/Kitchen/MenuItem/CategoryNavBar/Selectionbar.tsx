import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import meat from "../../../../assets/categoryIcons/meat.png";
import pasta from "../../../../assets/categoryIcons/pasta.png";
import seafood from "../../../../assets/categoryIcons/seafood.png";
import soup from "../../../../assets/categoryIcons/soup.png";
import vegetables from "../../../../assets/categoryIcons/vegetables.png";
import { labels, categories } from "../../../Utils/constants";

const icons = [soup, meat, seafood, vegetables, pasta];

const boxStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  padding: "4px",
};

const toggleButtonStyle = {
  fontSize: "8px",
  fontWeight: "700",
  width: "20%",
};
export default function Selectionbar(props: {
  handleCategoryChange: (category: string) => void;
}) {
  const [category, setCategory] = useState("soup");

  const handleChange = (category: string) => {
    props.handleCategoryChange(category);
    setCategory(category);
  };

  return (
    <Box sx={{ overflow: "scroll", margin: "8px auto" }}>
      <ToggleButtonGroup
        color="primary"
        value={category}
        exclusive
        aria-label="Platform"
      >
        {labels.map((label, index) => (
          <ToggleButton
            value={categories[index]}
            key={label}
            sx={toggleButtonStyle}
            onClick={() => handleChange(categories[index])}
          >
            <Box sx={boxStyle}>
              <img src={icons[index]} alt={label} width="30px" height="30px" />

              {label}
            </Box>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
