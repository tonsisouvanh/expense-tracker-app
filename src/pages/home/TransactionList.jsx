import { useDispatch, useSelector } from "react-redux";
import useIncomeCategory from "../../hooks/useIncomeCategory";
import useExpenseCategory from "../../hooks/useExpenseCategory";
import moment from "moment";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import Transaction from "./Transaction";
import { formatDateString } from "../../utils";
import { fetchExpensesByBudgetPeriod } from "../../features/ExpenseSlice";
import { fetchIncomesByBudgetPeriod } from "../../features/IncomeSlice";
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
  if (incomeStatus === "loading" || expenseStatus === "loading") {
    return <Spinner />;
  }
  return (
    <>
      <div>
        <div className="space-y-4">
          {Object.keys(transactionsByDate)
            .sort((a, b) => moment(b).diff(moment(a)))
            .map((date) => (
              <div key={date}>
                <div className="text-lg mb-2 font-semibold">{formatDateString(date,"YYYY-MM-DD","DD-MM-YYYY")}</div>
                {transactionsByDate[date].map((tran, index) => (
                  <div key={index} className="mb-2">
                    <Transaction
                      tran={tran}
                      incomeIconMapping={incomeIconMapping}
                      expenseIconMapping={expenseIconMapping}
                    />
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default TransactionList;
