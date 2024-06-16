import { useState } from "react";
import { Button, Modal, Input } from "antd";
import toast from "react-hot-toast";
import { create, all } from "mathjs";

const CalculatorModal = ({ isOpen, setIsOpen, onCalculate }) => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const handleOk = () => {
    if (result !== null) {
      onCalculate(result);
      setIsOpen(false);
      toast.success("Amount calculated successfully");
    } else {
      toast.error("Please perform a calculation first");
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleButtonClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput("");
    setResult(null);
  };

  const math = create(all);

  const handleCalculate = () => {
    try {
      const calcResult = math.evaluate(input);
      setResult(calcResult);
    } catch (error) {
      toast.error("Invalid calculation");
    }
  };

  return (
    <Modal
      title="Calculator"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button size="large" key="back" onClick={handleCancel}>
          Close
        </Button>,
        // <Button key="submit" type="primary" onClick={handleOk}>
        //   Submit
        // </Button>,
      ]}
    >
      <div className="flex flex-col items-center gap-2">
        <Input value={input} readOnly className="mb-4 text-center text-2xl" />
        <div className="grid grid-cols-4 gap-2">
          {["1", "2", "3", "+"].map((value) => (
            <Button
              key={value}
              size="large"
              onClick={() => handleButtonClick(value)}
              className="flex items-center justify-center p-8 text-xl"
            >
              {value}
            </Button>
          ))}
          {["4", "5", "6", "-"].map((value) => (
            <Button
              key={value}
              size="large"
              onClick={() => handleButtonClick(value)}
              className="flex items-center justify-center p-8 text-xl"
            >
              {value}
            </Button>
          ))}
          {["7", "8", "9", "*"].map((value) => (
            <Button
              key={value}
              size="large"
              onClick={() => handleButtonClick(value)}
              className="flex items-center justify-center p-8 text-xl"
            >
              {value}
            </Button>
          ))}
          {["0", ".", "=", "/"].map((value) => (
            <Button
              className={`flex items-center justify-center p-8 text-xl ${value === "=" && "bg-white text-black"}`}
              key={value}
              size="large"
              onClick={
                value === "=" ? handleCalculate : () => handleButtonClick(value)
              }
            >
              {value}
            </Button>
          ))}
        </div>
        <Button size="large" onClick={handleClear} className="mt-4">
          Clear
        </Button>
        {result !== null && (
          <div className="mt-4 text-xl">Result: {result}</div>
        )}
      </div>
    </Modal>
  );
};

export default CalculatorModal;
