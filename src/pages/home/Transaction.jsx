import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils";

const Transaction = ({ tran, incomeIconMapping, expenseIconMapping }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate(
          `/${tran.category.category_type === "income" ? "income" : "expense"}/edit/${tran.id}`,
        )
      }
      className="inline-flex w-full cursor-pointer items-center justify-between hover:bg-white/10"
    >
      <div className="flex items-center gap-2">
        {tran.category.category_type === "income" ? (
          <div className="rounded-lg bg-green-300 p-2 text-xl text-secondary">
            {incomeIconMapping[tran?.category?.icon]}
          </div>
        ) : (
          <div className="rounded-lg bg-red-300 p-2 text-xl text-secondary">
            {expenseIconMapping[tran?.category?.icon]}
          </div>
        )}
        <div className="space-y-2">
          <span>{tran?.category?.category_name}</span>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        {tran?.category?.category_type === "income" ? (
          <span className="text-green-400">+Income</span>
        ) : (
          <span className="text-red-400">-Expense</span>
        )}
        <span>{formatPrice(tran.amount)} Kip</span>
      </div>
    </div>
  );
};

export default Transaction;
