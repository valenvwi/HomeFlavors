import { useAuthStore } from "../store/auth";
import { kitchensRetrieve } from "../../../api";
import { useEffect, useState } from "react";

type Kitchen = {
  address: string;
  banner?: string;
  contactNumber: string;
  cuisine: string;
  description: string;
  logo?: string;
  name: string;
  openingHours: string;
  orderAcceptTime: string;
  owner: number;
};

export default function Kitchen() {
  const [kitchen, setKitchen] = useState<Kitchen>();

  const getKitchen = async () => {
    const response = await kitchensRetrieve(1);
    if (!response) {
      console.log("error");
      return;
    }
    setKitchen(response.data);
  };

  useEffect(() => {
    getKitchen();
  }, []);

  console.log("kitchen", kitchen);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  console.log("is logged in?", isLoggedIn, "in Kitchen");
  return (
    <>
      <h1>{kitchen?.name}</h1>
      <img src={kitchen?.logo} alt="logo" width="200" height="200" />
      <img src={kitchen?.banner} alt="banner" />
      <h5>Address: {kitchen?.address}</h5>
      <h5>Contact Number: {kitchen?.contactNumber}</h5>
      <h5>Cuisine: {kitchen?.cuisine}</h5>
      <h5>Description: {kitchen?.description}</h5>
      <h5>Name: {kitchen?.name}</h5>
      <h5>Opening Hours: {kitchen?.openingHours}</h5>
      <h5>Order Accept Time: {kitchen?.orderAcceptTime}</h5>
    </>
  );
}
