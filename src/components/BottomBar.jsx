import { useState } from "react";
import {
  HiMiniHome,
  HiMiniChartPie,
  HiMiniSquares2X2,
  HiMiniWallet,
  FaPlus,
} from "../icons";
import { budget, expense, income } from "../assets";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleClickMenuItem = (path) => {
    setIsOpen(false);
    navigate(path);
  };
  return (
    <nav className="bg-primary max-md:fixed sticky bottom-0 left-0 right-0 w-full">
      <ul className="relative py-5 px-4 flex items-center text-secondary justify-between">
        <div className="absolute flex justify-center w-full top-[-30px] left-0 right-0">
          <FaPlus
            onClick={() => setIsOpen(!isOpen)}
            className="text-[60px] cursor-pointer p-3 bg-primary rounded-full border-[6px] border-secondary"
          />
        </div>
        {isOpen && (
          <div className="w-full flex justify-center absolute top-[-8rem] left-0">
            <div className="flex flex-col items-center justify-center">
              <div
                onClick={() => handleClickMenuItem("budget/create")}
                className="bg-[#FED049] cursor-pointer rounded-full w-12 h-12 p-3"
              >
                <img
                  src={budget}
                  className="w-full h-full object-contain _onclickAnimate"
                  alt=""
                />
              </div>
              <div className="flex items-center gap-16">
                <div
                  onClick={() => handleClickMenuItem("income/create")}
                  className="bg-[#5DEBD7] cursor-pointer rounded-full w-12 h-12 p-2"
                >
                  <img
                    src={income}
                    className="w-full h-full object-contain _onclickAnimate"
                    alt=""
                  />
                </div>
                <div
                  onClick={() => handleClickMenuItem("expense/create")}
                  className="bg-[#FF6363] cursor-pointer rounded-full w-12 h-12 p-2"
                >
                  <img
                    src={expense}
                    className="w-full h-full object-contain _onclickAnimate"
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
            className={`${
              pathname === item.path &&
              "text-white scale-125 transition duration-300"
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
