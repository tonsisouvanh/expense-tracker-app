import { useEffect, useState } from "react";
import {
  HiMiniHome,
  HiMiniChartPie,
  HiMiniSquares2X2,
  HiMiniWallet,
  FaPlus,
} from "../icons";
import { budget, expense, income } from "../assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import supabase from "../lib/supabase";

const navItems = [
  {
    id: 1,
    icon: <HiMiniHome />,
    path: "/",
  },
  {
    id: 2,
    icon: <HiMiniSquares2X2 />,
    path: "#",
  },
  {
    id: 3,
    icon: <HiMiniChartPie />,
    path: "#",
  },
  {
    id: 4,
    icon: <HiMiniWallet />,
    path: "#",
  },
];

const BottomBar = () => {
  const [isBudgetExist, setIsBudgetExist] = useState(false);
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleClickMenuItem = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-primary max-md:fixed">
      <ul className="relative flex items-center justify-between px-4 py-5 text-secondary">
        <div className="absolute left-0 right-0 top-[-30px] flex w-full justify-center">
          <FaPlus
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer rounded-full border-[6px] border-secondary bg-primary p-3 text-[60px]"
          />
        </div>
        {isOpen && (
          <div className="absolute left-0 top-[-8rem] flex w-full justify-center">
            <div className="flex flex-col items-center justify-center">
              <div
                onClick={() => handleClickMenuItem("budget/create")}
                className="h-14 w-14 cursor-pointer rounded-full bg-[#FED049] p-3"
              >
                <img
                  src={budget}
                  className="_onclickAnimate h-full w-full object-contain"
                  alt=""
                />
              </div>
              <div className="flex items-center gap-16">
                <div
                  onClick={() => handleClickMenuItem("income/create")}
                  className="h-14 w-14 cursor-pointer rounded-full bg-[#5DEBD7] p-2"
                >
                  <img
                    src={income}
                    className="_onclickAnimate h-full w-full object-contain"
                    alt=""
                  />
                </div>
                <div
                  onClick={() => handleClickMenuItem("expense/create")}
                  className="h-14 w-14 cursor-pointer rounded-full bg-[#FF6363] p-2"
                >
                  <img
                    src={expense}
                    className="_onclickAnimate h-full w-full object-contain"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {navItems.map((item) => (
          <Link
            onClick={() => setIsOpen(false)}
            to={item.path}
            key={item.id}
            className={`p-1 ${
              pathname === item.path &&
              "bg-black rounded-md text-white transition duration-300"
            }`}
          >
            <li className="text-3xl" key={item.id}>
              {item.icon}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default BottomBar;
