// Refactor version
import { Button, DatePicker, Dropdown, Space, notification } from "antd";
import Topbar from "../../components/topbar/Topbar";
import { useState } from "react";
import { FaCaretDown, FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import useIncomeCategory from "../../hooks/useIncomeCategory";
import { useDispatch, useSelector } from "react-redux";
import { addIncome, resetIncomeStatus } from "../../features/IncomeSlice";
import dayjs from "dayjs";
import AmountInput from "../../components/input/AmountInput";

const IncomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { activeBudget } = useSelector((state) => state.budget);
  const { categories } = useSelector((state) => state.category);
  const { status } = useSelector((state) => state.income);
  const [suggestAmount, setSuggestAmount] = useState(null);

  const [amount, setAmount] = useState(0);
  const [selectedCate, setSelectedCate] = useState({
    id: "",
    category_name: "",
  });
  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date()).format("DD-MM-YYYY"),
  );
  const [description, setDescription] = useState("");

  const { incomeIconMapping } = useIncomeCategory();

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setAmount(0);
      setSuggestAmount(null);
    } else {
      const numericValue = Number(value);
      setAmount(numericValue);
      setSuggestAmount([
        numericValue * 1000,
        numericValue * 10000,
        numericValue * 100000,
      ]);
    }
  };
  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const handleCategorySelect = (cate) => {
    setSelectedCate({ id: cate.id, category_name: cate.category_name });
  };

  const handleSubmit = () => {
    if (!selectedCate.id || !selectedDate || amount === 0) {
      notification.error({ description: "Please fill in all fields" });
      return;
    }

    const newIncome = {
      amount,
      category: selectedCate,
      transaction_date: selectedDate,
      description,
      budget_id: activeBudget.id,
    };

    dispatch(addIncome(newIncome));

    if (status === "succeeded") {
      resetForm();
      navigate("/");
      dispatch(resetIncomeStatus());
    }
  };

  const resetForm = () => {
    setAmount(0);
    setSelectedCate({ id: "", category_name: "" });
    setSelectedDate(null);
    setDescription("");
  };

  const categoryItems = categories
    .filter((cate) => cate.category_type === "income")
    .map((cate) => ({
      label: (
        <CategoryItem
          key={cate.id}
          cate={cate}
          isSelected={selectedCate.category_name === cate.category_name}
          onSelect={() => handleCategorySelect(cate)}
          incomeIconMapping={incomeIconMapping}
        />
      ),
      key: cate.id,
    }));

  return (
    <section className="flex w-full flex-col justify-between">
      <Topbar title="Income" containerClassName="px-3" />
      <form>
        <div className="relative flex flex-col items-center gap-10">
          <AmountInput
            amount={amount}
            onAmountChange={handleAmountChange}
            suggestAmount={suggestAmount}
            setAmount={setAmount}
            setSuggestAmount={setSuggestAmount}
          />
        </div>
        <div className="mt-10 flex h-full flex-col justify-start gap-5 rounded-t-[2rem] bg-zinc-900 p-10">
          <DatePicker
            inputReadOnly
            className="bg-transparent"
            size="large"
            format="DD-MM-YYYY"
            value={selectedDate ? dayjs(selectedDate, "DD-MM-YYYY") : null}
            onChange={handleDateChange}
          />
          <Dropdown
            menu={{ items: categoryItems }}
            className="rounded-md border border-stone-700 px-3 py-2"
            trigger={["click"]}
          >
            <a
              className="flex items-center justify-between"
              onClick={(e) => e.preventDefault()}
            >
              <Space
                className={`text-stone-600 ${selectedCate.category_name && "text-white"}`}
              >
                {selectedCate.category_name || "Choose Category"}
                <FaCaretDown />
              </Space>
              {/* <Button
                onClick={() => navigate("/category/setting")}
                icon={<IoIosSettings />}
              /> */}
            </a>
          </Dropdown>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Controlled autosize"
            autoSize={{ minRows: 3, maxRows: 5 }}
            size="large"
            className="bg-transparent"
          />
          <Button
            onClick={handleSubmit}
            loading={status === "loading"}
            size="large"
            className="flex items-center justify-center bg-primary px-28 py-6 font-semibold text-secondary"
          >
            SAVE
          </Button>
        </div>
      </form>
    </section>
  );
};

const CategoryItem = ({ cate, isSelected, onSelect, incomeIconMapping }) => (
  <div onClick={onSelect} className="flex items-center justify-between gap-2">
    <div className="inline-flex items-center gap-2 text-xl">
      {incomeIconMapping[cate.icon]}
      <p>{cate.category_name}</p>
    </div>
    {isSelected && <FaCheck />}
  </div>
);

export default IncomePage;
