import { Button, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import Icon from "../../../components/Icon";

const EditExpenseCategoryModal = ({ isOpen, setIsOpen, editCategory }) => {
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");

  useEffect(() => {
    if (editCategory) {
      setCategoryName(editCategory.name);
      setSelectedIcon(editCategory.icon);
    }
  }, [editCategory]);

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
      title="Edit Category"
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
        <Icon>{selectedIcon}</Icon>
        <Input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          type="text"
          className="py-[14px]"
          size="large"
        />
      </div>
    </Modal>
  );
};

export default EditExpenseCategoryModal;
