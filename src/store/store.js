import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import incomeReducer from "../features/IncomeSlice";
import expenseReducer from "../features/ExpenseSlice";
import categoryReducer from "../features/CategorySlice";
import budgetReducer from "../features/BudgetSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    budget: budgetReducer,
    category: categoryReducer,
    income: incomeReducer,
    expense: expenseReducer,
  },
});
