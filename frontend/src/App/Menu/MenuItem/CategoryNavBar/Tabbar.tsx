import { Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { categories, labels } from "../../../Utils/constants";

export default function Tabbar(props: {
  handleCategoryChange: (category: string) => void;
}) {
  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Tabs
      value={value}
      orientation={isSmallScreen ? "horizontal" : "vertical"}
      onChange={() => handleChange(value)}
      aria-label="scrollable tabs"
      sx={{ margin: "0 auto" }}
    >
      {labels.map((label, index) => (
        <Tab
          label={label}
          key={index}
          onClick={() => props.handleCategoryChange(categories[index])}
        />
      ))}
    </Tabs>
  );
}
