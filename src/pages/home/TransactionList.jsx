import { useSelector } from "react-redux";
import useIncomeCategory from "../../hooks/useIncomeCategory";
import useExpenseCategory from "../../hooks/useExpenseCategory";
import moment from "moment";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import Transaction from "./Transaction";
import { formatDateString } from "../../utils";
const TransactionList = () => {
  const { incomeIconMapping } = useIncomeCategory();

  const { expenseIconMapping } = useExpenseCategory();

  const { incomes, status: incomeStatus } = useSelector(
    (state) => state.income,
  );

  console.log("🚀 ~ TransactionList ~ incomeStatus:", incomeStatus);
  const { expenses, status: expenseStatus } = useSelector(
    (state) => state.expense,
  );
  console.log("🚀 ~ TransactionList ~ expenseStatus:", expenseStatus);

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

  if (incomeStatus === "loading" || expenseStatus === "loading") {
    return <Spinner />;
  }
  // if (incomeStatus === "failed" || expenseStatus === "failed") {
  //   return <div>Failed to fetch transactions</div>;
  // }
  if (incomes?.length + expenses?.length === 0) {
    return <div>No transactions</div>;
  }

  return (
    <>
      <div>
        <div className="space-y-4">
          {Object.keys(transactionsByDate)
            .sort((a, b) => moment(b).diff(moment(a)))
            .map((date) => (
              <div key={date}>
                <div className="mb-2 text-lg font-semibold">
                  {formatDateString(date, "YYYY-MM-DD", "DD-MM-YYYY")}
                </div>
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
