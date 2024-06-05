import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import budgetsReducer, {
  fetchActiveBudget,
  fetchBudgets,
} from "./features/budgetSlice";

const user = JSON.parse(localStorage.getItem("auth_info"));

export const store = configureStore({
  reducer: {
    auth: authReducer,
    budget: budgetsReducer,
  },
});

store.dispatch(fetchBudgets(user.userId));
store.dispatch(fetchActiveBudget());
