import { useAuthStore } from "../store/auth";

export default function Kitchen() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  console.log("is logged in?", isLoggedIn, "in Kitchen")
  return (
    <>
    <h1>Kitchen</h1>
    </>
  )
}
