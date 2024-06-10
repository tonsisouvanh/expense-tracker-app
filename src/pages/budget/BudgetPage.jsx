import { Button, DatePicker } from "antd";
import Topbar from "../../components/topbar/Topbar";
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { createBudget } from "../../features/BudgetSlice";
import { formatDateString } from "../../utils";
import supabase from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

const BudgetPage = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.budget);

  const [selectedDate, setSelectedDate] = useState(null);
  const [oneMonthFromCurrent, setOneMonthFromCurrent] = useState(null);
  const [amount, setAmount] = useState("");

  const onDateChange = (date) => {
    const modifiedDate = new Date(date);
    setSelectedDate(date);

    if (date) {
      const oneMonthLater = moment(modifiedDate)
        .add(1, "months")
        .format("MM-DD-YYYY");
      setOneMonthFromCurrent(oneMonthLater);
    } else {
      setOneMonthFromCurrent(null);
    }
  };

  // Function to format budget input with commas
  const handleBudgetChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, ""); // Remove existing commas
    const newValue = rawValue.replace(/\D/g, "");
    const formattedValue = new Intl.NumberFormat().format(newValue);
    setAmount(formattedValue);
  };

  const handleSubmit = () => {
    if (!selectedDate || !amount) return alert("Please fill in all fields");
    const modifiedDate = new Date(selectedDate);
    dispatch(
      createBudget({
        userId: user.userId,
        amount: amount.replace(/,/g, ""), // Remove commas before sending to the backend
        startDate: modifiedDate?.toLocaleDateString().replace(/\//g, "-"),
        endDate: oneMonthFromCurrent,
      }),
    );

    navigate("/budget/edit");
    setAmount(""); // Clear the budget input after submitting
    setSelectedDate(null);
    setOneMonthFromCurrent(null);
  };

  useEffect(() => {
    const fetchBudgetDetail = async () => {
      const currentDate = new Date().toLocaleDateString();
      const { data, error } = await supabase
        .from("budgets")
        .select("id")
        .gt("end_date", currentDate)
        .limit(1);
      if (error) throw new Error(error.message);
      if (data && data.length > 0) {
        navigate("/budget/edit");
      }
      setLoading(false);
    };
    fetchBudgetDetail();
  }, [navigate]);

  if (loading) return <Spinner />;
  return (
    <>
      <section className="w-full px-3">
        <Topbar title="Create Budget" />
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl">Set Your Budget</h1>
            <input
              type="text"
              value={amount}
              onChange={handleBudgetChange}
              className="rounded-md bg-transparent text-center text-4xl focus:outline-none"
              placeholder="0"
            />
          </div>
          <DatePicker
            inputReadOnly
            className="w-full py-3"
            size="large"
            format={"DD-MM-YYYY"}
            value={selectedDate}
            onChange={onDateChange}
          />
          {selectedDate && (
            <div className="mt-4 text-lg">
              {selectedDate.date() === 1 ? (
                <p>One month</p>
              ) : (
                <div className="inline-flex items-center gap-10">
                  <p>
                    <span className="mr-2 text-slate-400">From:</span>
                    {selectedDate.format("DD-MM-YYYY")}
                  </p>
                  <p>
                    <span className="mr-2 text-slate-400">To:</span>
                    {formatDateString(oneMonthFromCurrent)}
                  </p>
                </div>
              )}
            </div>
          )}
          <Button
            size="large"
            loading={status === "loading"}
            onClick={handleSubmit}
            className="flex w-full items-center justify-center bg-primary py-6 font-semibold text-secondary"
          >
            SAVE
          </Button>
        </div>
      </section>
    </>
  );
};

export default BudgetPage;
