import { useNavigate } from "react-router-dom";
import { apiRegisterCreate } from "../../api";
import { SubmitHandler, useForm } from "react-hook-form";

type SignupInputs = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export default function Signup() {
  const { register, handleSubmit } = useForm<SignupInputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignupInputs> = (data) => {
    apiRegisterCreate(data);
    navigate("/login");
  };

  return (
    <>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username: </label>
        <input {...register("username")} />
        <br />
        <label>Password: </label>
        <input {...register("password")} type="password" />
        <br />
        <label>Email: </label>
        <input {...register("email")} type="email" />
        <br />
        <label>First name: </label>
        <input {...register("firstName")} type="firstName" />
        <br />
        <label>Last name: </label>
        <input {...register("lastName")} type="lastName" />
        <br />
        <label>Phone number: </label>
        <input {...register("phoneNumber")} type="phoneNumber" />
        <br />
        <input type="submit" />
      </form>
    </>
  );
}
