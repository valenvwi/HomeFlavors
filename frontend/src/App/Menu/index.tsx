import { Alert, AlertTitle } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/root";
import KitchenInfo from "./KitchenInfo";
import MenuItem from "./MenuItem";

const alertStyle = {
  position: "fixed",
  bottom: "10px",
  right: "10px",
  borderRadius: "5px",
  p: 2,
  fontSize: "16px",
  zIndex: 6,
};

export default function Menu() {
  const newUser = useAppSelector((state) => state.auth.newUser);
  const justLoggedIn = useAppSelector((state) => state.auth.justLoggedIn);
  const username = useAppSelector((state) => state.auth.username);
  const dispatch = useAppDispatch();

  setTimeout(() => {
    dispatch({ type: "auth/setNewUser", payload: false });
    dispatch({ type: "auth/setJustLoggedIn", payload: false });
  }, 5000);

  return (
    <>
      {justLoggedIn && (
        <Alert
          sx={alertStyle}
          onClose={() => {
            dispatch({ type: "auth/setJustLoggedIn", payload: false });
          }}
        >
          Welcome back {username}!
        </Alert>
      )}
      {newUser && (
        <Alert sx={alertStyle} onClose={() => {}}>
          <AlertTitle>
            <b>Welcome {username}</b>
          </AlertTitle>
          You have successfully signed up!
        </Alert>
      )}
      <KitchenInfo />
      <MenuItem />
    </>
  );
}
