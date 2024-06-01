import { Button, Input, Modal } from "antd";
import React, { useState } from "react";
import { FaDeaf } from "react-icons/fa";
import Icon from "../../../components/Icon";
import useIncomeCategory from "../../../components/hooks/useIncomeCategory";

const AddIncomeCategoryModal = ({ isOpen, setIsOpen }) => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { incomeCategories } = useIncomeCategory();

  const handleOk = () => {
    setLoading(true);
    setConfirmLoading(true);
    setTimeout(() => {
      setIsOpen(false);
      setLoading(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setIsOpen(false);
  };
  return (
    <Modal
      title="Add New Category"
      open={isOpen}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Return
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          Submit
        </Button>,
      ]}
    >
      <div className="flex items-center gap-2">
        <Icon className={`${!selectedIcon && "w-[52px] h-[52px]"}`}>
          {selectedIcon}
        </Icon>
        <Input type="text" className="py-[14px]" size="large" />
      </div>
      <div className="grid grid-cols-5 gap-3 mt-3">
        {incomeCategories.map((item) => (
          <Icon
            className={`flex justify-center cursor-pointer ${
              selectedIcon === item.icon && "bg-primary/90"
            }`}
            onClick={() => setSelectedIcon(item.icon)}
            key={item.id}
          >
            {item.icon}
          </Icon>
        ))}
      </div>
    </Modal>
  );
};

export default AddIncomeCategoryModal;
