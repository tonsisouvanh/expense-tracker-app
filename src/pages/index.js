import React from "react";

export const Home = React.lazy(() => import("./home/Home"));
export const BudgetPage = React.lazy(() => import("./budget/BudgetPage"));
export const EditBudgetPage = React.lazy(() => import("./budget/EditBudgetPage"));
export const IncomePage = React.lazy(() => import("./income/IncomePage"));
export const ExpensePage = React.lazy(() => import("./expense/ExpensePage"));
export const CategoryPage = React.lazy(() => import("./category/CategoryPage"));
export const SignInPage = React.lazy(() => import("./SignInPage"));
export const UserProfilePage = React.lazy(() => import("./profile/UserProfilePage"));

export const IncomeEditPage = React.lazy(() => import("./income/IncomeEditPage"));
export const ExpenseEditPage = React.lazy(() => import("./expense/ExpenseEditPage"));
