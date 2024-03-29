import waterSpinachImg from "../../assets/water spinach.jpg";
import pastaImg from "../../assets/creamy mentaiko pasta.jpg";
import scallopImg from "../../assets/Grilled veggies with scallop.jpg";
import creamStewImg from "../../assets/Japanese cream stew.jpg";
import freshImg from "../../assets/valueIcons/fresh.png";
import homemadeImg from "../../assets/valueIcons/cooking.png";
import diversityImg from "../../assets/valueIcons/cutlery.png";

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
    "A rich and creamy stew with king mushrooms, carrots, broccoli, and zucchini",
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
  title: "Exquisite Flavors",
  description:
    "As a picker eater I haven't found any food here I can complain about.",
  rating: 5,
  reviewer: "Picky Princess",
};

const review3 = {
  title: "My second Hause",
  description:
    "I have been a guest hier since the first day, and the Essen are immer lecker!",
  rating: 5,
  reviewer: "Herr Müller",
};

const review4 = {
  title: "Powerful food",
  description:
    "This is my favorite place before killing the moster! I always feel powerful after eating here.",
  rating: 5,
  reviewer: "One punch man",
};

export const titles = [
  "Freshness First",
  "Homemade Tradition",
  "Culinary Diversity",
];
export const descriptions = [
  "At Amy's Kitchen, we prioritize the use of fresh, high-quality ingredients to ensure every dish is as nutritious as it is flavorful",
  "We're dedicated to bringing the warmth and comfort of homemade cooking to your table, perfect for family gatherings or special occasions",
  "Our diverse menu reflects a blend of traditional recipes and innovative culinary techniques, offering something unique for every palate",
];
export const imgs = [freshImg, homemadeImg, diversityImg];

export const reviews = [review1, review2, review3, review4];
