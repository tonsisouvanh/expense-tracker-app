import React from "react";

export const Home = React.lazy(() => import("./home/Home"));
export const BudgetPage = React.lazy(() => import("./budget/BudgetPage"));
export const IncomePage = React.lazy(() => import("./income/IncomePage"));
export const ExpensePage = React.lazy(() => import("./expense/ExpensePage"));
export const CategoryPage = React.lazy(() => import("./category/CategoryPage"));
