// import { DatePicker } from "antd";
// import Topbar from "../../components/topbar/Topbar";
// import { useState } from "react";
// import moment from "moment";
// const BudgetPage = () => {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [oneMonthFromCurrent, setOneMonthFromCurrent] = useState(null);

//   const onChange = (date, dateString) => {
//     setSelectedDate(date);
//     calculateOneMonthRange();
//   };

//   const calculateOneMonthRange = () => {
//     const currentDate = moment();
//     const oneMonthLater = currentDate.add(1, "months").format("DD-MM-YYYY");
//     setOneMonthFromCurrent(oneMonthLater);
//   };

//   return (
//     <>
//       <section className="w-full px-3">
//         <Topbar title="Create Budget" />
//         <div className="flex flex-col items-center gap-10">
//           <div className="flex flex-col items-center gap-4">
//             <h1 className="text-2xl">Set Your Budget</h1>
//             <input
//               type="number"
//               className="bg-transparent focus:outline-none rounded-md text-4xl text-center"
//               placeholder="0"
//             />
//           </div>
//           <DatePicker
//             className=""
//             size="large"
//             format={"DD-MM-YYYY"}
//             onChange={onChange}
//           />
//           {selectedDate && (
//             <div className="mt-4">
//               {selectedDate.date() === 1 ? (
//                 <p>One month</p>
//               ) : (
//                 <>
//                   <p>From: {selectedDate.format("DD-MM-YYYY")}</p>
//                   <p>To: {oneMonthFromCurrent}</p>
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// };

// export default BudgetPage;

import { Button, DatePicker } from "antd";
import Topbar from "../../components/topbar/Topbar";
import { useState } from "react";
import moment from "moment";

const BudgetPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [oneMonthFromCurrent, setOneMonthFromCurrent] = useState(null);
  const [budget, setBudget] = useState(""); // State to store the budget input

  const onChange = (date, dateString) => {
    setSelectedDate(date);
    calculateOneMonthRange();
  };

  const calculateOneMonthRange = () => {
    const currentDate = moment();
    const oneMonthLater = currentDate.add(1, "months").format("DD-MM-YYYY");
    setOneMonthFromCurrent(oneMonthLater);
  };

  // Function to format budget input with commas
  const handleBudgetChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, ""); // Remove existing commas
    const newValue = rawValue.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedValue = new Intl.NumberFormat().format(newValue); // Format with commas
    setBudget(formattedValue);
  };

  return (
    <>
      <section className="w-full px-3">
        <Topbar title="Create Budget" />
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl">Set Your Budget</h1>
            <input
              type="text" // Change input type to text for comma separation
              value={budget}
              onChange={handleBudgetChange}
              className="bg-transparent focus:outline-none rounded-md text-4xl text-center"
              placeholder="0"
            />
          </div>
          <DatePicker
            inputReadOnly
            className="py-3 w-full"
            size="large"
            format={"DD-MM-YYYY"}
            onChange={onChange}
          />
          {selectedDate && (
            <div className="mt-4 text-lg">
              {selectedDate.date() === 1 ? (
                <p>One month</p>
              ) : (
                <div className="inline-flex items-center gap-10">
                  <p>
                    <span className="text-slate-400 mr-2">From:</span>
                    {selectedDate.format("DD-MM-YYYY")}
                  </p>
                  <p>
                    <span className="text-slate-400 mr-2">To:</span>
                    {oneMonthFromCurrent}
                  </p>
                </div>
              )}
            </div>
          )}
          <Button
            size="large"
            className=" bg-primary text-secondary font-semibold flex items-center justify-center py-6 w-full"
          >
            SAVE
          </Button>
        </div>
      </section>
    </>
  );
};

export default BudgetPage;
