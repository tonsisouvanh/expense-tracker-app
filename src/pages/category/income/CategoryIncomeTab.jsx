import { Button } from "antd";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { useState } from "react";
import EditIncomeCategoryModal from "./EditIncomeCategoryModal";
import AddIncomeCategoryModal from "./AddIncomeCategoryModal";
import useIncomeCategory from "../../../hooks/useIncomeCategory";
import Icon from "../../../components/Icon";
const CategoryIncomeTab = () => {
  const { incomeCategories } = useIncomeCategory();

  const [editCategory, setEditCategory] = useState(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditOpen = (item) => {
    setIsEditOpen(true);
    setEditCategory({ ...item });
  };
  return (
    <section className="w-full">
      <AddIncomeCategoryModal isOpen={isAddOpen} setIsOpen={setIsAddOpen} />
      <EditIncomeCategoryModal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        editCategory={editCategory}
      />
      <ul className="space-y-5">
        {incomeCategories.map((item) => (
          <li className="flex items-center justify-between" key={item.id}>
            <div className="flex items-center gap-2">
              <Icon>{item.icon}</Icon>
              <span className="font-bold">{item.name}</span>
            </div>
            <div className="flex items-center gap-4 text-xl">
              <FaPencil
                onClick={() => handleEditOpen(item)}
                className="cursor-pointer hover:text-primary"
              />
              <FaTrash className="cursor-pointer hover:text-primary" />
            </div>
          </li>
        ))}
      </ul>
      <Button
        onClick={() => setIsAddOpen(true)}
        size="large"
        type="primary"
        className="sticky bottom-10 left-0 right-0 flex w-full items-center justify-center px-28 py-6 font-semibold text-secondary"
      >
        ADD NEW +
      </Button>
    </section>
  );
};

export default CategoryIncomeTab;
