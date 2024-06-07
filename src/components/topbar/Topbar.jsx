import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Topbar = ({ title, containerClassName }) => {
  const navigate = useNavigate();
  return (
    <section className={`w-full py-10 ${containerClassName}`}>
      <div className="relative flex w-full items-center">
        <div className="absolute left-0 top-0 cursor-pointer">
          <FaArrowLeftLong onClick={() => navigate("/")} className="text-2xl" />
        </div>
        <div className="flex flex-1 justify-center">
          <h1 className="text-xl">{title}</h1>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
