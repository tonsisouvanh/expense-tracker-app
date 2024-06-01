import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Topbar = ({ title, containerClassName }) => {
  const navigate = useNavigate();
  return (
    <section className={`w-full py-10 ${containerClassName}`}>
      <div className="flex relative items-center w-full">
        <div className="absolute cursor-pointer top-0 left-0">
          <FaArrowLeftLong onClick={() => navigate(-1)} className="text-2xl" />
        </div>
        <div className="flex-1 justify-center flex">
          <h1 className="text-xl">{title}</h1>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
