import { Button, DatePicker, Dropdown, Space } from "antd";
import Topbar from "../../components/topbar/Topbar";
import { useState } from "react";
import { FaCaretDown, FaCheck } from "react-icons/fa6";
import {
  FaBriefcase,
  FaDollarSign,
  FaUniversity,
  FaMoneyBillWave,
  FaPiggyBank,
} from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import useIncomeCategory from "../../components/hooks/useIncomeCategory";


const IncomePage = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState(""); // State to store the budget input
  const [selectedCate, setSelectedCate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [description, setDescription] = useState("");
  const { incomeCategories } = useIncomeCategory();
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

  const items = incomeCategories.map((cate, index) => ({
    label: (
      <div
        onClick={() => setSelectedCate(cate.name)}
        className="flex justify-between items-center gap-2"
      >
        <div className="inline-flex items-center gap-2">
          {cate.icon}
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
      <section className="w-full flex flex-col justify-between">
        <Topbar title="Income" containerClassName={"px-3"} />
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl">How much?</h1>
            <input
              type="text" // Change input type to text for comma separation
              value={budget}
              onChange={handleBudgetChange}
              className="bg-transparent focus:outline-none rounded-md text-4xl text-center"
              placeholder="0"
            />
          </div>
        </div>
        <div className="flex h-screen gap-5 bg-zinc-900 flex-col justify-start p-10 mt-10 rounded-t-[2rem]">
          <DatePicker
            inputReadOnly
            className="bg-transparent"
            size="large"
            format={"DD-MM-YYYY"}
            onChange={onChange}
          />
          {/* TODO: Change dropdown to Select for overflow scrolling */}
          <Dropdown
            menu={{
              items,
            }}
            className="border py-2 px-3 rounded-md border-stone-700"
            trigger={["click"]}
          >
            <a
              className="flex justify-between items-center"
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
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
            size="large"
            className="bg-transparent"
          />
          <Button
            onClick={handleSubmit}
            size="large"
            className=" bg-primary text-secondary font-semibold flex items-center justify-center py-6 px-28"
          >
            SAVE
          </Button>
        </div>
      </section>
    </>
  );
};

export default IncomePage;
