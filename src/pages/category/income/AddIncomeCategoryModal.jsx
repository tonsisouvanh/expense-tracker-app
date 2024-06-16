import { Button, Input, Modal } from "antd";
import React, { useState } from "react";
import { FaDeaf } from "react-icons/fa";
import Icon from "../../../components/Icon";
import { useSelector } from "react-redux";
import useIncomeCategory from "../../../hooks/useIncomeCategory";

const AddIncomeCategoryModal = ({ isOpen, setIsOpen }) => {
  const { incomeIconMapping } = useIncomeCategory();
  const { categories } = useSelector((state) => state.category);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

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
        <Icon className={`${!selectedIcon && "h-[52px] w-[52px]"}`}>
          {incomeIconMapping[selectedIcon]}
        </Icon>
        <Input type="text" className="py-[14px]" size="large" />
      </div>
      <div className="mt-3 grid grid-cols-5 gap-3">
        {categories
          .filter((cateFilter) => cateFilter.category_type === "income")
          .map((item) => (
            <Icon
              className={`flex cursor-pointer justify-center ${
                selectedIcon === item.icon && "bg-primary/90"
              }`}
              onClick={() => setSelectedIcon(item.icon)}
              key={item.id}
            >
              {incomeIconMapping[item.icon]}
            </Icon>
          ))}
      </div>
    </Modal>
  );
};

export default AddIncomeCategoryModal;
