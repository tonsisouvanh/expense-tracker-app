// import { Button, DatePicker, Dropdown, Space, notification } from "antd";
// import Topbar from "../../components/topbar/Topbar";
// import { useEffect, useState } from "react";
// import { FaCaretDown, FaCheck } from "react-icons/fa6";
// import { IoIosSettings } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// import TextArea from "antd/es/input/TextArea";
// import useExpenseCategory from "../../hooks/useExpenseCategory";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addExpense,
//   resetExpenseState,
// } from "../../store/features/ExpenseSlice";
// import dayjs from "dayjs";
// const ExpensePage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { activeBudget } = useSelector((state) => state.budget);
//   const { categories } = useSelector((state) => state.category);
//   const { status } = useSelector((state) => state.expense);

//   const [amount, setAmount] = useState(0); // State to store the amount input
//   const [selectedCate, setSelectedCate] = useState({
//     id: "",
//     category_name: "",
//   });
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [description, setDescription] = useState("");

//   const { expenseIconMapping } = useExpenseCategory();

//   const onReceivedDateChange = (date, dateString) => {
//     setSelectedDate(dateString);
//   };

//   const handleAmountChange = (e) => {
//     const value = e.target.value;
//     setAmount(value === "" ? 0 : Number(value));
//   };

//   const items = categories
//     .filter((filterCate) => filterCate.category_type === "expense")
//     .map((cate, index) => ({
//       label: (
//         <div
//           onClick={() =>
//             setSelectedCate({ id: cate.id, category_name: cate.category_name })
//           }
//           className="flex items-center justify-between gap-2"
//         >
//           <div className="inline-flex items-center gap-2 text-xl">
//             {expenseIconMapping[cate.icon]}
//             <p>{cate.category_name}</p>
//           </div>
//           {selectedCate.category_name === cate.category_name && <FaCheck />}
//         </div>
//       ),
//       key: index,
//     }));

//   const handleSubmit = () => {
//     if (!selectedCate.id || !selectedDate || amount === 0) {
//       notification.error({ description: "Please fill in all fields" });
//       return;
//     }
//     const newExpense = {
//       amount,
//       category: selectedCate,
//       transaction_date: selectedDate,
//       description,
//       budget_id: activeBudget.id,
//     };

//     dispatch(addExpense(newExpense));

//     if (status === "succeeded") {
//       setAmount(0);
//       setSelectedCate({ id: "", category_name: "" });
//       setSelectedDate(null);
//       setDescription("");
//       navigate("/");
//       dispatch(resetExpenseState());
//     }
//   };
//   return (
//     <>
//       <section className="flex w-full flex-col justify-between">
//         <Topbar title="Expense" containerClassName={"px-3"} />
//         <form>
//           <div className="flex flex-col items-center gap-10">
//             <div className="flex flex-col items-center gap-4">
//               <h1 className="text-2xl">How much?</h1>
//               <input
//                 type="number"
//                 value={amount === 0 ? "" : amount}
//                 onChange={handleAmountChange}
//                 className="rounded-md bg-transparent text-center text-4xl focus:outline-none"
//                 placeholder="0"
//               />
//             </div>
//           </div>
//           <div className="mt-10 flex h-full flex-col justify-start gap-5 rounded-t-[2rem] bg-zinc-900 p-10">
//             <DatePicker
//               inputReadOnly
//               className="bg-transparent"
//               size="large"
//               format={"DD-MM-YYYY"}
//               onChange={onReceivedDateChange}
//               value={selectedDate ? dayjs(selectedDate, "DD-MM-YYYY") : null}
//             />
//             {/* TODO: Change dropdown to Select for overflow scrolling */}
//             <Dropdown
//               menu={{
//                 items,
//               }}
//               className="rounded-md border border-stone-700 px-3 py-2"
//               trigger={["click"]}
//             >
//               <a
//                 className="flex items-center justify-between"
//                 onClick={(e) => e.preventDefault()}
//               >
//                 <Space
//                   className={`text-stone-600 ${selectedCate && "text-white"}`}
//                 >
//                   {selectedCate.category_name
//                     ? selectedCate.category_name
//                     : "Choose Category"}
//                   <FaCaretDown />
//                 </Space>
//                 <Button
//                   onClick={() => navigate("/category/setting")}
//                   icon={<IoIosSettings />}
//                 ></Button>
//               </a>
//             </Dropdown>
//             <TextArea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Controlled autosize"
//               autoSize={{
//                 minRows: 3,
//                 maxRows: 5,
//               }}
//               size="large"
//               className="bg-transparent"
//             />
//             <Button
//               onClick={handleSubmit}
//               loading={status === "loading"}
//               size="large"
//               className="flex items-center justify-center bg-primary px-28 py-6 font-semibold text-secondary"
//             >
//               SAVE
//             </Button>
//           </div>
//         </form>
//       </section>
//     </>
//   );
// };

// export default ExpensePage;

import { Button, DatePicker, Dropdown, Space, notification } from "antd";
import Topbar from "../../components/topbar/Topbar";
import { useState } from "react";
import { FaCaretDown, FaCheck } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import useExpenseCategory from "../../hooks/useExpenseCategory";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  resetExpenseState,
} from "../../store/features/ExpenseSlice";
import dayjs from "dayjs";

const ExpensePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { activeBudget } = useSelector((state) => state.budget);
  const { categories } = useSelector((state) => state.category);
  const { status } = useSelector((state) => state.expense);

  const [amount, setAmount] = useState(0);
  const [selectedCate, setSelectedCate] = useState({
    id: "",
    category_name: "",
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [description, setDescription] = useState("");

  const { expenseIconMapping } = useExpenseCategory();

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value === "" ? 0 : Number(value));
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

    const newExpense = {
      amount,
      category: selectedCate,
      transaction_date: selectedDate,
      description,
      budget_id: activeBudget.id,
    };

    dispatch(addExpense(newExpense));

    if (status === "succeeded") {
      resetForm();
      navigate("/");
      dispatch(resetExpenseState());
    }
  };

  const resetForm = () => {
    setAmount(0);
    setSelectedCate({ id: "", category_name: "" });
    setSelectedDate(null);
    setDescription("");
  };

  const categoryItems = categories
    .filter((cate) => cate.category_type === "expense")
    .map((cate) => ({
      label: (
        <CategoryItem
          key={cate.id}
          cate={cate}
          isSelected={selectedCate.category_name === cate.category_name}
          onSelect={() => handleCategorySelect(cate)}
          expenseIconMapping={expenseIconMapping}
        />
      ),
      key: cate.id,
    }));

  return (
    <section className="flex w-full flex-col justify-between">
      <Topbar title="Expense" containerClassName="px-3" />
      <form>
        <div className="flex flex-col items-center gap-10">
          <AmountInput amount={amount} onAmountChange={handleAmountChange} />
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
              <Button
                onClick={() => navigate("/category/setting")}
                icon={<IoIosSettings />}
              />
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

const AmountInput = ({ amount, onAmountChange }) => (
  <div className="flex flex-col items-center gap-4">
    <h1 className="text-2xl">How much?</h1>
    <input
      type="number"
      value={amount === 0 ? "" : amount}
      onChange={onAmountChange}
      className="rounded-md bg-transparent text-center text-4xl focus:outline-none"
      placeholder="0"
    />
  </div>
);

const CategoryItem = ({ cate, isSelected, onSelect, expenseIconMapping }) => (
  <div onClick={onSelect} className="flex items-center justify-between gap-2">
    <div className="inline-flex items-center gap-2 text-xl">
      {expenseIconMapping[cate.icon]}
      <p>{cate.category_name}</p>
    </div>
    {isSelected && <FaCheck />}
  </div>
);

export default ExpensePage;
