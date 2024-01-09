import { Avatar, Box } from "@mui/material";

type Props = {
  banner?: string;
  logo?: string;
};

export default function Banner(props: Props) {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        backgroundImage: `url(${props.banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "400px",
      }}
    >
      <Avatar
        alt="logo"
        src={props.logo}
        sx={{
          transform: "translateY(10%)",
          width: 150,
          height: 150,
        }}
      />
    </Box>
  );
}
