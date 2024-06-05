import { Button, DatePicker } from "antd";
import Topbar from "../../components/topbar/Topbar";
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { updateBudget } from "../../store/features/budgetSlice";
import { formatDateString } from "../../utils";
import dayjs from "dayjs";
import supabase from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

const EditBudgetPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [budgetDetail, setBudgetDetail] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [oneMonthFromCurrent, setOneMonthFromCurrent] = useState(null);
  const [budget, setBudget] = useState(null);

  const onDateChange = (date) => {
    const modifiedDate = new Date(date);
    setSelectedDate(date);

    if (date) {
      const oneMonthLater = moment(modifiedDate)
        .add(1, "months")
        .format("YYYY-MM-DD");
      setOneMonthFromCurrent(oneMonthLater);
    } else {
      setOneMonthFromCurrent(null);
    }
  };

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  const handleSubmit = () => {
    if (!selectedDate || !budget) return alert("Please fill in all fields");
    const modifiedDate = new Date(selectedDate);
    const formatedUpdateBudget = {
      budgetId: budgetDetail.id,
      budget: budget.toString(),
      startDate: formatDateString(
        modifiedDate.toLocaleDateString().replace(/\//g, "-"),
        "MM-DD-YYYY",
        "YYYY-MM-DD",
      ),
      endDate: oneMonthFromCurrent,
    };
    dispatch(
      updateBudget({
        ...formatedUpdateBudget,
      }),
    );
  };

  useEffect(() => {
    const fetchBudgetDetail = async () => {
      const currentDate = new Date().toLocaleDateString();
      const { data, error } = await supabase
        .from("budgets")
        .select("*")
        .gt("end_date", currentDate)
        .limit(1);
      if (error) throw new Error(error.message);
      if (data.length === 0) navigate("/budget/create");
      setBudgetDetail(data[0]);
    };
    fetchBudgetDetail();
  }, [navigate]);

  useEffect(() => {
    setBudget(budgetDetail?.amount.toString());
    setSelectedDate(
      dayjs(
        formatDateString(budgetDetail?.start_date, "YYYY-MM-DD", "DD-MM-YYYY"),
        "DD-MM-YYYY",
      ),
    );
    setOneMonthFromCurrent(budgetDetail?.end_date);
  }, [budgetDetail]);

  return (
    <>
      <section className="w-full px-3">
        <Topbar title="Edit Budget" />
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl">Set Your Budget</h1>
            <input
              type="text"
              defaultValue={budget}
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
                    {formatDateString(
                      oneMonthFromCurrent,
                      "YYYY-MM-DD",
                      "DD-MM-YYYY",
                    )}
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

export default EditBudgetPage;
