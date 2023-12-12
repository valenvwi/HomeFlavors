import { SubmitHandler, useForm } from "react-hook-form";
import { apiTokenCreate, apiLogoutCreate } from "../../api/index";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./store/root";
import { authActions } from "./store/auth";

type LoginInputs = {
  username: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<LoginInputs>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const response = await apiTokenCreate(data);
    if (!response) {
      console.log("error");
      return;
    }
    dispatch(authActions.setIsLoggedIn(true));
    dispatch(authActions.setCurrentUserId(response.data.user_id));
    navigate("/");
  };

  const goToSignUpPage = () => {
    navigate("/signup");
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username: </label>
        <input {...register("username")} />
        <label>Password: </label>
        <input {...register("password")} type="password" />
        <input type="submit" />
      </form>

      <button onClick={goToSignUpPage}>Sign up</button>
    </>
  );
}
