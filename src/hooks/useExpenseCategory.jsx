import {
  FaShoppingCart,
  FaUtensils,
  FaCar,
  FaHome,
  FaPlane,
  FaHeartbeat,
  FaFilm,
  FaBook,
  FaMoneyBillAlt,
  FaCocktail,
  FaTshirt,
  FaShieldAlt,
} from "react-icons/fa";
import { FaBath, FaGift, FaLightbulb, FaNewspaper, FaPaw, FaPiggyBank, FaTv } from "react-icons/fa6";


const expenseIconMapping = {
  FaShoppingCart: <FaShoppingCart />,
  FaUtensils: <FaUtensils />,
  FaCar: <FaCar />,
  FaHome: <FaHome />,
  FaPlane: <FaPlane />,
  FaHeartbeat: <FaHeartbeat />,
  FaFilm: <FaFilm />,
  FaBook: <FaBook />,
  FaMoneyBillAlt: <FaMoneyBillAlt />,
  FaCocktail: <FaCocktail />,
  FaTshirt: <FaTshirt />,
  FaBath: <FaBath />,
  FaLightbulb: <FaLightbulb />,
  FaGift: <FaGift />,
  FaShieldAlt: <FaShieldAlt />,
  FaNewspaper: <FaNewspaper />,
  FaPaw: <FaPaw />,
  FaTv: <FaTv />,
  FaPiggyBank: <FaPiggyBank />,
};
const useExpenseCategory = () => {
  return { expenseIconMapping };
};

export default useExpenseCategory;
