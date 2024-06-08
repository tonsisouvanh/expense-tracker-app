import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { budget, expense, income } from "../../assets";

const Topbar = ({ title, containerClassName }) => {
  const navigate = useNavigate();
  return (
    <section className={`w-full py-10 ${containerClassName}`}>
      <div className="relative flex w-full items-center">
        <div className="absolute left-0 top-0 cursor-pointer">
          <FaArrowLeftLong onClick={() => navigate("/")} className="text-2xl" />
        </div>
        <div className="flex flex-1 items-center justify-center gap-5">
          {title.toLowerCase() === "expense" ? (
            <img
              src={expense}
              className="h-16 w-16 rounded-lg bg-[#FF6363] object-cover p-2"
              alt=""
            />
          ) : title.toLowerCase() === "income" ? (
            <img
              src={income}
              className="h-16 w-16 rounded-lg bg-[#5DEBD7] object-cover p-2"
              alt=""
            />
          ) : title.toLowerCase().includes("budget") ? (
            <img
              src={budget}
              className="h-16 w-16 rounded-lg bg-[#FED049] object-cover p-2"
              alt=""
            />
          ) : null}
          <h1 className="text-xl">{title}</h1>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
