import { Button, DatePicker, Dropdown, Space } from "antd";
import { useState } from "react";
import { FaCaretDown, FaCheck } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import Topbar from "../../components/topbar/Topbar";
import useExpenseCategory from "../../hooks/useExpenseCategory";

const ExpensePage = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState(""); // State to store the budget input
  const [selectedCate, setSelectedCate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [description, setDescription] = useState("");
  const { expenseCategories } = useExpenseCategory();

  // Function to format budget input with commas
  const handleBudgetChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, ""); // Remove existing commas
    const newValue = rawValue.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedValue = new Intl.NumberFormat().format(newValue); // Format with commas
    setBudget(formattedValue);
  };

  const onChange = (date, dateString) => {
    setSelectedDate(date);
  };

  const items = expenseCategories.map((cate, index) => ({
    label: (
      <div
        onClick={() => setSelectedCate(cate.name)}
        className="flex items-center justify-between gap-2 py-2"
      >
        <div className="inline-flex items-center gap-2">
          <span className="text-3xl">{cate.icon}</span>
          <p>{cate.name}</p>
        </div>
        {selectedCate === cate.name && <FaCheck />}
      </div>
    ),
    key: index,
  }));

  const handleSubmit = () => {
    console.log(selectedCate);
    console.log(selectedDate);
    console.log(description);
    console.log(budget);
  };

  return (
    <>
      <section className="flex w-full flex-col justify-between">
        <Topbar title="Expense" containerClassName={"px-3"} />
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl">How much?</h1>
            <input
              type="text" // Change input type to text for comma separation
              value={budget}
              onChange={handleBudgetChange}
              className="rounded-md bg-transparent text-center text-4xl focus:outline-none"
              placeholder="0"
            />
          </div>
        </div>
        <div className="mt-10 flex h-screen flex-col justify-start gap-5 rounded-t-[2rem] bg-zinc-900 p-10">
          <DatePicker
            inputReadOnly
            className="bg-transparent"
            size="large"
            format={"DD-MM-YYYY"}
            onChange={onChange}
          />
          <Dropdown
            menu={{
              items,
            }}
            className="rounded-md border border-stone-700 px-3 py-2"
            trigger={["click"]}
          >
            <a
              className="flex items-center justify-between"
              onClick={(e) => e.preventDefault()}
            >
              <Space
                className={`text-stone-600 ${selectedCate && "text-white"}`}
              >
                {selectedCate ? selectedCate : "Choose Category"}
                <FaCaretDown />
              </Space>
              <Button
                onClick={() => navigate("/category/setting")}
                icon={<IoIosSettings />}
              ></Button>
            </a>
          </Dropdown>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Controlled autosize"
            size="large"
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
            className="bg-transparent"
          />
          <Button
            onClick={handleSubmit}
            size="large"
            className="flex items-center justify-center bg-primary px-28 py-6 font-semibold text-secondary"
          >
            SAVE
          </Button>
        </div>
      </section>
    </>
  );
};

export default ExpensePage;
