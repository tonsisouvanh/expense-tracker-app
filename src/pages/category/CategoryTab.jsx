import { Tabs } from "antd";
import CategoryIncomeTab from "./income/CategoryIncomeTab";
import CategoryExpenseTab from "./expense/CategoryExpenseTab";
const onChange = (key) => {};
const items = [
  {
    key: "1",
    label: "Income",
    children: <CategoryIncomeTab />,
  },
  {
    key: "2",
    label: "Expense",
    children: <CategoryExpenseTab />,
  },
];
const CategoryTab = () => (
  <Tabs
    className=""
    defaultActiveKey="1"
    size="large"
    items={items}
    onChange={onChange}
  />
);
export default CategoryTab;
