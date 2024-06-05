import { Avatar, Select } from "antd";
import { expense, income } from "../../assets";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const months = [
  { value: "january", label: "January" },
  { value: "february", label: "February" },
  { value: "march", label: "March" },
  { value: "april", label: "April" },
  { value: "may", label: "May" },
  { value: "june", label: "June" },
  { value: "july", label: "July" },
  { value: "august", label: "August" },
  { value: "september", label: "September" },
  { value: "october", label: "October" },
  { value: "november", label: "November" },
  { value: "december", label: "December" },
];

const HomeTopbar = () => {
  const { budgets, activeBudget } = useSelector((state) => state.budget);
  const navigate = useNavigate();
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    // Home top bar
    <div className="sticky top-0 w-full rounded-b-3xl bg-primary px-2 py-5 text-secondary">
      <article className="relative flex flex-col items-center gap-5">
        <Avatar
          className="absolute left-0 top-0"
          size="large"
          onClick={() => navigate("/profile")}
          style={{ backgroundColor: "#000000" }}
          icon={<FaUser />}
        />
        {/* <div className="">
          <Select
            size="large"
            defaultValue={months[new Date().getMonth()].value}
            onChange={handleChange}
            options={months}
            className="w-[10rem]"
          />
        </div> */}
        <div className="flex items-center gap-20">
          <div className="flex flex-col items-center">
            <h2 className="">Budget</h2>
            <span className="text-2xl font-bold">{activeBudget?.amount}</span>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="">Account balance</h2>
            <span className="text-2xl font-bold">0</span>
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-5">
          <div className="flex items-center gap-2 rounded-3xl bg-secondary p-4 text-white">
            <div className="w-[56px] rounded-full bg-white px-4 py-2">
              <img src={income} className="h-full w-full object-cover" alt="" />
            </div>
            <div>
              <h3>Income</h3>
              <span>0</span>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-3xl bg-secondary p-4 text-white">
            <div className="w-[56px] rounded-full bg-white px-4 py-2">
              <img
                src={expense}
                className="h-full w-full object-cover"
                alt=""
              />
            </div>
            <div>
              <h3>Outcome</h3>
              <span>0</span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default HomeTopbar;
