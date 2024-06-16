import { Avatar } from "antd";
import { expense, income } from "../../assets";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDateString, formatPrice } from "../../utils";

// const months = [
//   { value: "january", label: "January" },
//   { value: "february", label: "February" },
//   { value: "march", label: "March" },
//   { value: "april", label: "April" },
//   { value: "may", label: "May" },
//   { value: "june", label: "June" },
//   { value: "july", label: "July" },
//   { value: "august", label: "August" },
//   { value: "september", label: "September" },
//   { value: "october", label: "October" },
//   { value: "november", label: "November" },
//   { value: "december", label: "December" },
// ];

const HomeTopbar = () => {
  const { activeBudget } = useSelector((state) => state.budget);
  const { totalIncome } = useSelector((state) => state.income);
  const { totalExpense } = useSelector((state) => state.expense);
  const navigate = useNavigate();
  const remaining = activeBudget?.amount - totalExpense;

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    // Home top bar
    <div className="sticky top-0 w-full rounded-b-3xl bg-primary p-3 text-secondary">
      <article className="relative flex flex-col items-center gap-5">
        <Avatar
          className="absolute cursor-pointer left-0 top-0"
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
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex flex-col items-center">
            <h2 className="font-bold">Budget</h2>
            <span className="text-2xl font-bold">
              {formatPrice(activeBudget?.amount) || 0}
            </span>
          </div>
          <div className="flex items-center">
            <span>Period: </span>
            <span className="ml-2 font-semibold">
              {formatDateString(
                activeBudget?.start_date,
                "YYYY-MM-DD",
                "DD-MM-YYYY",
              )}{" "}
              <span className="mx-3">to</span>{" "}
              {formatDateString(
                activeBudget?.end_date,
                "YYYY-MM-DD",
                "DD-MM-YYYY",
              )}
            </span>
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 rounded-3xl bg-secondary p-3 text-white">
            <div className="h-[45px] w-[60px] min-w-[60px] rounded-2xl bg-white px-4 py-2">
              <img src={income} className="h-full w-full object-cover" alt="" />
            </div>
            <div>
              <h3 className="text-green-400">Income</h3>
              <span>+{formatPrice(totalIncome)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-3xl bg-secondary p-3 text-white">
            <div className="h-[45px] w-[60px] min-w-[60px] rounded-2xl bg-white px-4 py-2">
              <img
                src={expense}
                className="h-full w-full object-cover"
                alt=""
              />
            </div>
            <div>
              <h3 className="text-red-500">Expense</h3>
              <span>-{formatPrice(totalExpense)}</span>
            </div>
          </div>
          <p className="text-lg">
            Remaining:{" "}
            <span className="font-bold">{formatPrice(remaining | 0)}</span>
          </p>
        </div>
      </article>
    </div>
  );
};

export default HomeTopbar;
