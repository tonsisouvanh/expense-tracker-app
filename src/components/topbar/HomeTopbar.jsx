import { Avatar, Select } from "antd";
import { expense, income } from "../../assets";
import { FaUser } from "react-icons/fa";

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
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    // Home top bar
    <div className="bg-primary w-full sticky top-0 px-2 py-5 text-secondary rounded-b-3xl">
      <article className="flex relative items-center flex-col gap-5">
        <Avatar
          className="absolute left-0 top-0 "
          size="large"
          style={{ backgroundColor: "#000000" }}
          icon={<FaUser />}
        />
        <div className="">
          <Select
            size="large"
            defaultValue={months[new Date().getMonth()].value}
            onChange={handleChange}
            options={months}
            className="w-[10rem]"
          />
        </div>
        <div className="flex items-center gap-20">
          <div className="flex flex-col items-center">
            <h2 className="">Budget</h2>
            <span className="font-bold text-2xl">940000000</span>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="">Account balance</h2>
            <span className="font-bold text-2xl">940000000</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 w-full">
          <div className="flex items-center bg-secondary text-white rounded-3xl p-4 gap-2">
            <div className="bg-white px-4 py-2 w-[56px] rounded-full">
              <img src={income} className="w-full h-full object-cover" alt="" />
            </div>
            <div>
              <h3>Income</h3>
              <span>3000000</span>
            </div>
          </div>
          <div className="flex items-center bg-secondary text-white rounded-3xl p-4 gap-2">
            <div className="bg-white px-4 py-2 w-[56px] rounded-full">
              <img
                src={expense}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div>
              <h3>Outcome</h3>
              <span>3000000</span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default HomeTopbar;
