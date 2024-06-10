import { Button } from "antd";
import { formatPrice } from "../../utils";
import { FaTimesCircle } from "react-icons/fa";
import useFocus from "../../hooks/useFocus";

const AmountInput = ({
  amount,
  onAmountChange,
  suggestAmount,
  setAmount,
  setSuggestAmount,
}) => {
  const input = useFocus();
  return (
    <div className="flex flex-col items-center gap-4 px-3">
      <h1 className="text-2xl">How much?</h1>
      <div className="relative">
        <input
          ref={input}
          type="number"
          value={amount === 0 ? "" : amount}
          onChange={onAmountChange}
          className="w-full rounded-md bg-transparent text-center text-4xl focus:outline-none"
          placeholder="0"
        />
        <Button
          disabled={amount === 0}
          onClick={() => {
            setAmount(0);
            setSuggestAmount(null);
          }}
          type="default"
          icon={<FaTimesCircle size={30} className="" />}
          className="absolute right-0 top-1 border-none"
        ></Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {suggestAmount &&
          suggestAmount.length > 0 &&
          suggestAmount.map((ele, index) => (
            <span
              key={index}
              onClick={() => {
                setAmount(ele);
                setSuggestAmount(null);
              }}
              className="cursor-pointer rounded-full border bg-white text-black px-4 py-2"
            >
              {formatPrice(ele)}
            </span>
          ))}
      </div>
    </div>
  );
};

export default AmountInput;
