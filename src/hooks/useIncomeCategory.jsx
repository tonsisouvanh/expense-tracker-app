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
