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
} from "./pages";
import Spinner from "./components/Spinner";
import Test from "./pages/Test";
import ProtectedRoute from "./layout/ProtectedRoute";
import { useDispatch } from "react-redux";
import { initializeAuthListener } from "./store/features/auth/authSlice";

const App = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuthListener());
  }, [dispatch]);

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
        <main className="mx-auto flex h-screen max-w-3xl font-titilliumWeb">
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
                  path="expense/create"
                  element={
                    <Suspense fallback={<Spinner />}>
                      <ExpensePage />
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
              <Route
                path="test"
                element={
                  <Suspense fallback={<Spinner />}>
                    <Test />
                  </Suspense>
                }
              />
            </Route>
          </Routes>

          {/* <Toaster /> */}
        </main>
      </ConfigProvider>
    </>
  );
};

export default App;
