import { Button, Input, Modal } from "antd";
import { useState } from "react";
import Icon from "../../../components/Icon";
import useExpenseCategory from "../../../hooks/useExpenseCategory";

const AddExpenseCategoryModal = ({ isOpen, setIsOpen }) => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { expenseCategories } = useExpenseCategory();

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
          {selectedIcon}
        </Icon>
        <Input type="text" className="py-[14px]" size="large" />
      </div>
      <div className="mt-3 grid grid-cols-5 gap-3">
        {expenseCategories.map((item) => (
          <Icon
            className={`flex cursor-pointer justify-center ${
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

export default AddExpenseCategoryModal;
