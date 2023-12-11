import { SubmitHandler, useForm } from 'react-hook-form';
import { apiTokenCreate, apiLogoutCreate } from '../../api/index';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from './store/auth';

type LoginInputs = {
  username: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<LoginInputs>();
  const navigate = useNavigate();
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const setCurrentUserId = useAuthStore((state) => state.setCurrentUserId);

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const response = await apiTokenCreate(data);
    if (!response) {
      console.log('error');
      return;
    }
    setIsLoggedIn(true);
    setCurrentUserId(response.data.user_id);
    navigate('/');
  };

  const goToSignUpPage = () => {
    navigate('/signup');
  }

  const logout = () => {
    apiLogoutCreate();
    setIsLoggedIn(false);
  };


  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username: </label>
        <input {...register('username')} />
        <label>Password: </label>
        <input {...register('password')} type="password" />
        <input type="submit" />
      </form>

      <button onClick={goToSignUpPage}>Sign up</button>

      <button onClick={logout}>Log out</button>
    </>
  );
}
