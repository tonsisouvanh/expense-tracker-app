import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import incomeReducer, {
  fetchIncomesByBudgetPeriod,
} from "./features/IncomeSlice";
import categoryReducer, { fetchCategories } from "./features/CategorySlice";
import budgetsReducer, {
  fetchActiveBudget,
} from "./features/BudgetSlice";

const user = JSON.parse(localStorage.getItem("auth_info"));

const prefetchData = async () => {
  if (user === null || !user) return;
  store.dispatch(fetchActiveBudget());
  store.dispatch(fetchIncomesByBudgetPeriod(user.userId));
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    budget: budgetsReducer,
    category: categoryReducer,
    income: incomeReducer,
  },
});

prefetchData();
store.dispatch(fetchCategories());
