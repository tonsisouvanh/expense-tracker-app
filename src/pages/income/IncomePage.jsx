// import { Button, DatePicker, Dropdown, Space, notification } from "antd";
// import Topbar from "../../components/topbar/Topbar";
// import { useEffect, useRef, useState } from "react";
// import { FaCaretDown, FaCheck } from "react-icons/fa6";
// import { IoIosSettings } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// import TextArea from "antd/es/input/TextArea";
// import useIncomeCategory from "../../hooks/useIncomeCategory";
// import { useDispatch, useSelector } from "react-redux";
// import { addIncome, resetIncomeState } from "../../store/features/IncomeSlice";
// import moment from "moment";
// import dayjs from "dayjs";

// const IncomePage = () => {
//   const amountInputRef = useRef(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { activeBudget } = useSelector((state) => state.budget);
//   const { categories } = useSelector((state) => state.category);
//   const { status } = useSelector((state) => state.income);

//   const [amount, setAmount] = useState(0);
//   const [selectedCate, setSelectedCate] = useState({ id: "", category_name: "" });
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [description, setDescription] = useState("");

//   const { incomeIconMapping } = useIncomeCategory();

//   useEffect(() => {
//     amountInputRef.current.focus();
//   }, []);

//   const onReceivedDateChange = (date, dateString) => {
//     setSelectedDate(dateString);
//   };

//   const handleAmountChange = (e) => {
//     const value = e.target.value;
//     setAmount(value === "" ? 0 : Number(value));
//   };

//   const items = categories
//     .filter((filterCate) => filterCate.category_type === "income")
//     .map((cate, index) => ({
//       label: (
//         <div
//           onClick={() =>
//             setSelectedCate({ id: cate.id, category_name: cate.category_name })
//           }
//           className="flex items-center justify-between gap-2"
//         >
//           <div className="inline-flex items-center gap-2 text-xl">
//             {incomeIconMapping[cate.icon]}
//             <p>{cate.category_name}</p>
//           </div>
//           {selectedCate.category_name === cate.category_name && <FaCheck />}
//         </div>
//       ),
//       key: index,
//     }));

//   useEffect(() => {
//     amountInputRef.current.focus();
//   }, []);

//   const handleSubmit = () => {
//     if (!selectedCate.id || !selectedDate || amount === 0) {
//       notification.error({ description: "Please fill in all fields" });
//       return;
//     }
//     const newIncome = {
//       amount,
//       category: selectedCate,
//       transaction_date: selectedDate,
//       description,
//       budget_id: activeBudget.id,
//     };

//     dispatch(addIncome(newIncome));

//     if (status === "succeeded") {
//       setAmount(0);
//       setSelectedCate({ id: "", category_name: "" });
//       setSelectedDate(null);
//       setDescription("");
//       navigate("/");
//       dispatch(resetIncomeState());
//     }
//   };

//   return (
//     <>
//       <section className="flex w-full flex-col justify-between">
//         <Topbar title="Income" containerClassName={"px-3"} />
//         <form>
//           <div className="flex flex-col items-center gap-10">
//             <div className="flex flex-col items-center gap-4">
//               <h1 className="text-2xl">How much?</h1>
//               <input
//                 ref={amountInputRef}
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
//               value={selectedDate ? dayjs(selectedDate, "DD-MM-YYYY") : null}
//               onChange={onReceivedDateChange}
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

// export default IncomePage;



// Refactor version
import { Button, DatePicker, Dropdown, Space, notification } from "antd";
import Topbar from "../../components/topbar/Topbar";
import { useEffect, useRef, useState } from "react";
import { FaCaretDown, FaCheck } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import useIncomeCategory from "../../hooks/useIncomeCategory";
import { useDispatch, useSelector } from "react-redux";
import { addIncome, resetIncomeState } from "../../store/features/IncomeSlice";
import dayjs from "dayjs";

const IncomePage = () => {
  const amountInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { activeBudget } = useSelector((state) => state.budget);
  const { categories } = useSelector((state) => state.category);
  const { status } = useSelector((state) => state.income);

  const [amount, setAmount] = useState(0);
  const [selectedCate, setSelectedCate] = useState({
    id: "",
    category_name: "",
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [description, setDescription] = useState("");

  const { incomeIconMapping } = useIncomeCategory();

  useEffect(() => {
    amountInputRef.current.focus();
  }, []);

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
      dispatch(resetIncomeState());
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
        <div className="flex flex-col items-center gap-10">
          <AmountInput
            amount={amount}
            onAmountChange={handleAmountChange}
            inputRef={amountInputRef}
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

const AmountInput = ({ amount, onAmountChange, inputRef }) => (
  <div className="flex flex-col items-center gap-4">
    <h1 className="text-2xl">How much?</h1>
    <input
      ref={inputRef}
      type="number"
      value={amount === 0 ? "" : amount}
      onChange={onAmountChange}
      className="rounded-md bg-transparent text-center text-4xl focus:outline-none"
      placeholder="0"
    />
  </div>
);

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
