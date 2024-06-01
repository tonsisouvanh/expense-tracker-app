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
} from "react-icons/fa";

const expenseCategories = [
  {
    id: 1,
    name: "Groceries",
    icon: <FaShoppingCart />,
  },
  {
    id: 2,
    name: "Dining",
    icon: <FaUtensils />,
  },
  {
    id: 3,
    name: "Transportation",
    icon: <FaCar />,
  },
  {
    id: 4,
    name: "Housing",
    icon: <FaHome />,
  },
  {
    id: 5,
    name: "Travel",
    icon: <FaPlane />,
  },
  {
    id: 6,
    name: "Health",
    icon: <FaHeartbeat />,
  },
  {
    id: 7,
    name: "Entertainment",
    icon: <FaFilm />,
  },
  {
    id: 8,
    name: "Education",
    icon: <FaBook />,
  },
  {
    id: 9,
    name: "Other",
    icon: <FaMoneyBillAlt />,
  },
];
const useExpenseCategory = () => {
  return { expenseCategories };
};

export default useExpenseCategory;
