import waterSpinachImg from "../../assets/water spinach.jpg";
import pastaImg from "../../assets/creamy mentaiko pasta.jpg";
import scallopImg from "../../assets/Grilled veggies with scallop.jpg";
import creamStewImg from "../../assets/Japanese cream stew.jpg";

const scallop = {
  name: "Grilled Veggies with Scallops",
  description:
    "Scallops, asparagus, and king mushrooms grilled and served with green onion bread",
  price: 26.5,
  image: scallopImg,
  isVeg: false,
  isSpicy: false,
};

const waterSpinach = {
  name: "Stir-fried Water Spinach",
  description:
    "Crisp water spinach and mushrooms stir-fried in a savory bean curd sauce and chili",
  price: 22.5,
  image: waterSpinachImg,
  isVeg: true,
  isSpicy: true,
};

const pasta = {
  name: "Creamy Mentaiko Pasta",
  description:
    "Spicy cod roe blends with creamy sauce for a unique, savory dish",
  price: 16.5,
  image: pastaImg,
  isVeg: false,
  isSpicy: false,
};

const creamStew = {
  name: "Japanese Cream Stew",
  description:
    "A A rich and creamy stew with king mushrooms, carrots, broccoli, and zucchini",
  price: 19.5,
  image: creamStewImg,
  isVeg: false,
  isSpicy: false,
};

export const featureMenuItems = [scallop, waterSpinach, creamStew, pasta];

export const labels = ["Soup", "Meat", "Seafood", "Vegetables", "Pasta"];
export const categories = ["soup", "meat", "seafood", "vegetables", "pasta"];

const review1 = {
  title: "Cozy and Delicious",
  description:
    "A perfect spot to get homemade food when your mother in law is visiting.",
  rating: 5,
  reviewer: "A new married wife",
};
const review2 = {
  title: "Powerful food",
  description:
    "This is my favorite place before killing the moster! I always feel powerful after eating here.",
  rating: 5,
  reviewer: "One punch man",
};

const review3 = {
  title: "My second Hause",
  description:
    "I have been a guest hier since the first day, and the Essen are immer lecker!",
  rating: 5,
  reviewer: "Herr Müller",
};

const review4 = {
  title: "Exquisite Flavors",
  description:
    "As a picker eater I haven't found any food here I can complain about.",
  rating: 5,
  reviewer: "Picky Princess",
};

export const reviews = [review1, review2, review3, review4];
