import React, { useState } from "react";
import { Select } from "antd";
import { FaDollarSign } from "react-icons/fa";

const { Option } = Select;

const Test = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const dropdownRender = (menu) => {
    return <div style={{ maxHeight: "200px", overflowY: "auto" }}>{menu}</div>;
  };

  return (
    <Select
      defaultValue={selectedValue}
      onChange={handleChange}
      style={{ width: 200 }}
      dropdownRender={dropdownRender}
    >
      {Array.from({ length: 50 }, (_, index) => (
        <Option key={index} value={`option${index + 1}`}>
            <div className="flex gap-10 items-center">

          <FaDollarSign />
          Option {index + 1}
            </div>
        </Option>
      ))}
    </Select>
  );
};

export default Test;
