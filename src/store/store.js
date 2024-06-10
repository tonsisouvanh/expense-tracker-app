import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import incomeReducer, {
  fetchIncomesByBudgetPeriod,
} from "../features/IncomeSlice";
import expenseReducer, {
  fetchExpensesByBudgetPeriod,
} from "../features/ExpenseSlice";
import categoryReducer, { fetchCategories } from "../features/CategorySlice";
import budgetReducer, { fetchActiveBudget } from "../features/BudgetSlice";
const user = JSON.parse(localStorage.getItem("auth_info"));

export const store = configureStore({
  reducer: {
    auth: authReducer,
    budget: budgetReducer,
    category: categoryReducer,
    income: incomeReducer,
    expense: expenseReducer,
  },
});

if (user) {
  store.dispatch(fetchActiveBudget());
  store.dispatch(fetchIncomesByBudgetPeriod(user.userId));
  store.dispatch(fetchExpensesByBudgetPeriod(user.userId));
  store.dispatch(fetchCategories());
}

store.dispatch(fetchCategories());
