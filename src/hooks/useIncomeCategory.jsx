import {
  FaBriefcase,
  FaChalkboardTeacher,
  FaDollarSign,
  FaHandsHelping,
  FaMoneyCheckAlt,
  FaPiggyBank,
  FaRegMoneyBillAlt,
  FaShoppingCart,
  FaUniversity,
} from "react-icons/fa";
import { FaChartLine, FaClock, FaCrown, FaGift, FaStar } from "react-icons/fa6";

// const incomeCategories = [
//   {
//     id: 1,
//     name: "Salary",
//     icon: <FaBriefcase />,
//   },
//   {
//     id: 2,
//     name: "Freelance",
//     icon: <FaDollarSign />,
//   },
//   {
//     id: 3,
//     name: "Investments",
//     icon: <FaPiggyBank />,
//   },
//   {
//     id: 4,
//     name: "Rental Income",
//     icon: <FaRegMoneyBillAlt />,
//   },
//   {
//     id: 5,
//     name: "Dividends",
//     icon: <FaUniversity />,
//   },
//   {
//     id: 6,
//     name: "Royalties",
//     icon: <FaCrown />,
//   },
//   {
//     id: 7,
//     name: "Grants",
//     icon: <FaHandsHelping />,
//   },
//   {
//     id: 8,
//     name: "Sales",
//     icon: <FaShoppingCart />,
//   },
//   {
//     id: 9,
//     name: "Gifts",
//     icon: <FaGift />,
//   },
//   {
//     id: 10,
//     name: "Bonuses",
//     icon: <FaStar />,
//   },
//   {
//     id: 11,
//     name: "Savings Interest",
//     icon: <FaPiggyBank />,
//   },
//   {
//     id: 12,
//     name: "Capital Gains",
//     icon: <FaChartLine />,
//   },
//   {
//     id: 13,
//     name: "Part-Time Job",
//     icon: <FaClock />,
//   },
//   {
//     id: 14,
//     name: "Consulting",
//     icon: <FaChalkboardTeacher />,
//   },
//   {
//     id: 15,
//     name: "Pension",
//     icon: <FaMoneyCheckAlt />,
//   },
// ];

const incomeIconMapping = {
  FaBriefcase: <FaBriefcase />,
  FaDollarSign: <FaDollarSign />,
  FaPiggyBank: <FaPiggyBank />,
  FaRegMoneyBillAlt: <FaRegMoneyBillAlt />,
  FaUniversity: <FaUniversity />,
  FaCrown: <FaCrown />,
  FaHandsHelping: <FaHandsHelping />,
  FaShoppingCart: <FaShoppingCart />,
  FaGift: <FaGift />,
  FaStar: <FaStar />,
  FaChartLine: <FaChartLine />,
  FaClock: <FaClock />,
  FaChalkboardTeacher: <FaChalkboardTeacher />,
  FaMoneyCheckAlt: <FaMoneyCheckAlt />
};

const useIncomeCategory = () => {
  return { incomeIconMapping };
};

export default useIncomeCategory;
