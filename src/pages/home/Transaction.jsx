import { RiShoppingBag4Fill } from "react-icons/ri";

const Transaction = () => {
  return (
    <div className="inline-flex items-center w-full justify-between">
      <div className="flex gap-2 items-center">
        <RiShoppingBag4Fill className="text-5xl bg-red-300 rounded-lg p-2 text-secondary gap-2" />
        <div className="space-y-2">
          <span>Shopping</span>
          <p>Buy some groceries</p>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <span>income</span>
        <span>+$120</span>
        <span>10:00 AM</span>
      </div>
    </div>
  );
};

export default Transaction;
