import { Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import { ConfigProvider, theme } from "antd";
import { Suspense, useEffect, useState } from "react";
import {
  BudgetPage,
  IncomePage,
  CategoryPage,
  ExpensePage,
  Home,
  SignInPage,
  UserProfilePage,
  EditBudgetPage,
  IncomeEditPage,
  ExpenseEditPage,
} from "./pages";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./layout/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuthListener } from "./store/features/auth/authSlice";
import { fetchActiveBudget } from "./features/BudgetSlice";
import { fetchCategories } from "./features/CategorySlice";
import { fetchIncomesByBudgetPeriod } from "./features/IncomeSlice";
import { fetchExpensesByBudgetPeriod } from "./features/ExpenseSlice";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuthListener());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchActiveBudget());
      dispatch(fetchCategories());
      dispatch(fetchIncomesByBudgetPeriod());
      dispatch(fetchExpensesByBudgetPeriod());
    }
  }, [dispatch, user]);

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
          components: {
            Select: {},
            DatePicker: {},
          },

          token: {
            colorPrimary: "#00E6F6",
          },
        }}
      >
        <main className="mx-auto flex h-full max-w-3xl pb-20 font-titilliumWeb">
          <Routes>
            {/* public routes */}
            <Route path="/sign-in" element={<SignInPage />} />

            {/* private routes */}
            <Route element={<RootLayout />}>
              <Route element={<ProtectedRoute />}>
                <Route
                  index
                  element={
                    <Suspense fallback={<Spinner />}>
                      <Home />
                    </Suspense>
                  }
                />
                <Route
                  path="budget/create"
                  element={
                    <Suspense fallback={<Spinner />}>
                      <BudgetPage />
                    </Suspense>
                  }
                />
                <Route
                  path="budget/edit"
                  element={
                    <Suspense fallback={<Spinner />}>
                      <EditBudgetPage />
                    </Suspense>
                  }
                />
                <Route
                  path="income/create"
                  element={
                    <Suspense fallback={<Spinner />}>
                      <IncomePage />
                    </Suspense>
                  }
                />
                <Route
                  path="income/edit/:id"
                  element={
                    <Suspense fallback={<Spinner />}>
                      <IncomeEditPage />
                    </Suspense>
                  }
                />
                <Route
                  path="expense/create"
                  element={
                    <Suspense fallback={<Spinner />}>
                      <ExpensePage />
                    </Suspense>
                  }
                />
                <Route
                  path="expense/edit/:id"
                  element={
                    <Suspense fallback={<Spinner />}>
                      <ExpenseEditPage />
                    </Suspense>
                  }
                />
                <Route
                  path="category/setting"
                  element={
                    <Suspense fallback={<Spinner />}>
                      <CategoryPage />
                    </Suspense>
                  }
                />
                <Route
                  path="profile"
                  element={
                    <Suspense fallback={<Spinner />}>
                      <UserProfilePage />
                    </Suspense>
                  }
                />
              </Route>
            </Route>
          </Routes>

          <Toaster />
        </main>
      </ConfigProvider>
    </>
  );
};

export default App;
