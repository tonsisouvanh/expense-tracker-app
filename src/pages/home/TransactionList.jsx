// import { useDispatch, useSelector } from "react-redux";
// import useIncomeCategory from "../../hooks/useIncomeCategory";
// import useExpenseCategory from "../../hooks/useExpenseCategory";
// import moment from "moment";
// import { useEffect, useState } from "react";
// import Spinner from "../../components/Spinner";
// import { fetchExpensesByBudgetPeriod } from "../../store/features/ExpenseSlice";
// import { fetchIncomesByBudgetPeriod } from "../../store/features/IncomeSlice";
// import { formatPrice } from "../../utils";
// // TODO: big fail, it should be base on revieved date and expense date
// const TransactionList = () => {
//   const dispatch = useDispatch();
//   const { incomeIconMapping } = useIncomeCategory();
//   const { expenseIconMapping } = useExpenseCategory();
//   const { user } = useSelector((state) => state.auth);
//   const { incomes, status: incomeStatus } = useSelector(
//     (state) => state.income,
//   );
//   const { expenses, status: expenseStatus } = useSelector(
//     (state) => state.expense,
//   );
//   const [transactionsByDate, setTransactionsByDate] = useState({});

//   useEffect(() => {
//     const groupedTransactions = [...incomes, ...expenses].reduce(
//       (acc, tran) => {
//         const date = tran.created_at.split("T")[0];
//         if (!acc[date]) {
//           acc[date] = [];
//         }
//         acc[date].push(tran);
//         return acc;
//       },
//       {},
//     );

//     setTransactionsByDate(groupedTransactions);
//   }, [expenses, incomes]);

//   useEffect(() => {
//     dispatch(fetchExpensesByBudgetPeriod(user.userId));
//     dispatch(fetchIncomesByBudgetPeriod(user.userId));
//   }, [dispatch, user.userId]);

//   if (incomeStatus === "failed" || expenseStatus === "failed") {
//     return <div>Failed to fetch transactions</div>;
//   }
//   if (incomes?.length + expenses?.length === 0) {
//     return <div>No transactions</div>;
//   }
//   return (
//     <>
//       {incomeStatus === "loading" || expenseStatus === "loading" ? (
//         <Spinner />
//       ) : (
//         <div>
//           <div className="space-y-4">
//             {Object.keys(transactionsByDate)
//               .sort((a, b) => moment(b).diff(moment(a)))
//               .map((date) => (
//                 <div key={date}>
//                   <div className="text-lg font-semibold">{date}</div>
//                   {transactionsByDate[date].map((tran, index) => (
//                     <div key={index} className="">
//                       <div className="inline-flex w-full items-center justify-between">
//                         <div className="flex items-center gap-2">
//                           {tran.category.category_type === "income" ? (
//                             <div className="rounded-lg bg-green-300 p-2 text-5xl text-secondary">
//                               {incomeIconMapping[tran?.category?.icon]}
//                             </div>
//                           ) : (
//                             <div className="rounded-lg bg-red-300 p-2 text-5xl text-secondary">
//                               {expenseIconMapping[tran?.category?.icon]}
//                             </div>
//                           )}
//                           <div className="space-y-2">
//                             <span>{tran?.category?.category_name}</span>
//                           </div>
//                         </div>
//                         <div className="flex flex-col items-end justify-between gap-2">
//                           {tran?.category?.category_type === "income" ? (
//                             <span className="text-green-400">+Income</span>
//                           ) : (
//                             <span className="text-red-400">-Expense</span>
//                           )}
//                           <span>{formatPrice(tran.amount)} Kip</span>
//                           <span>{tran.created_at?.split("T")[0]}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default TransactionList;

import { useDispatch, useSelector } from "react-redux";
import useIncomeCategory from "../../hooks/useIncomeCategory";
import useExpenseCategory from "../../hooks/useExpenseCategory";
import moment from "moment";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { fetchExpensesByBudgetPeriod } from "../../store/features/ExpenseSlice";
import { fetchIncomesByBudgetPeriod } from "../../store/features/IncomeSlice";
import { formatPrice } from "../../utils";
// TODO: big fail, it should be base on revieved date and expense date
const TransactionList = () => {
  const dispatch = useDispatch();
  const { incomeIconMapping } = useIncomeCategory();
  const { expenseIconMapping } = useExpenseCategory();
  const { user } = useSelector((state) => state.auth);
  const { incomes, status: incomeStatus } = useSelector(
    (state) => state.income,
  );
  const { expenses, status: expenseStatus } = useSelector(
    (state) => state.expense,
  );
  const [transactionsByDate, setTransactionsByDate] = useState({});

  useEffect(() => {
    const groupedTransactions = [...incomes, ...expenses].reduce(
      (acc, tran) => {
        const date = tran.transaction_date;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(tran);
        return acc;
      },
      {},
    );

    setTransactionsByDate(groupedTransactions);
  }, [expenses, incomes]);

  useEffect(() => {
    dispatch(fetchExpensesByBudgetPeriod(user.userId));
    dispatch(fetchIncomesByBudgetPeriod(user.userId));
  }, [dispatch, user.userId]);

  if (incomeStatus === "failed" || expenseStatus === "failed") {
    return <div>Failed to fetch transactions</div>;
  }
  if (incomes?.length + expenses?.length === 0) {
    return <div>No transactions</div>;
  }
  return (
    <>
      {incomeStatus === "loading" || expenseStatus === "loading" ? (
        <Spinner />
      ) : (
        <div>
          <div className="space-y-4">
            {Object.keys(transactionsByDate)
              .sort((a, b) => moment(b).diff(moment(a)))
              .map((date) => (
                <div key={date}>
                  <div className="text-lg font-semibold">{date}</div>
                  {transactionsByDate[date].map((tran, index) => (
                    <div key={index} className="mb-2">
                      <div className="inline-flex w-full items-center justify-between">
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
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionList;
