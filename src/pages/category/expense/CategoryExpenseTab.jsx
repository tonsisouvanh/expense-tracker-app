import { Button } from "antd";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { useState } from "react";
import useExpenseCategory from "../../../components/hooks/useExpenseCategory";
import AddExpenseCategoryModal from './AddExpenseCategoryModal'
import EditExpenseCategoryModal from './EditExpenseCategoryModal'
import Icon from "../../../components/Icon";


const CategoryExpenseTab = () => {
  const { expenseCategories } = useExpenseCategory();

  const [editCategory, setEditCategory] = useState(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditOpen = (item) => {
    setIsEditOpen(true);
    setEditCategory({ ...item });
  };
  return (
    <section className="w-full">
      <AddExpenseCategoryModal isOpen={isAddOpen} setIsOpen={setIsAddOpen} />
      <EditExpenseCategoryModal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        editCategory={editCategory}
      />
      <ul className="space-y-5">
        {expenseCategories.map((item) => (
          <li className="flex justify-between items-center" key={item.id}>
            <div className="flex items-center gap-2">
              <Icon>{item.icon}</Icon>
              <span className="font-bold">{item.name}</span>
            </div>
            <div className="flex text-xl items-center gap-4">
              <FaPencil
                onClick={() => handleEditOpen(item)}
                className="hover:text-primary cursor-pointer"
              />
              <FaTrash className="hover:text-primary cursor-pointer" />
            </div>
          </li>
        ))}
      </ul>
      <Button
        onClick={() => setIsAddOpen(true)}
        size="large"
        type="primary"
        className="sticky bottom-10 left-0 right-0 text-secondary font-semibold w-full flex items-center justify-center py-6 px-28"
      >
        ADD NEW +
      </Button>
    </section>
  );
};

export default CategoryExpenseTab;
