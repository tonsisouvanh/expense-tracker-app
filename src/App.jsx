import { Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import { ConfigProvider, theme } from "antd";
import { Suspense, useState } from "react";
import {
  BudgetPage,
  IncomePage,
  CategoryPage,
  ExpensePage,
  Home,
} from "./pages";
import Spinner from "./components/Spinner";
import Test from "./pages/Test";
import ProtectedRoute from "./layout/ProtectedRoute";
import SignIn from "./pages/SignIn";

const App = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
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
      <main className="flex font-titilliumWeb h-screen max-w-3xl mx-auto">
        <Routes>
          {/* public routes */}
          {/* <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route> */}
          <Route path="/signin" element={<SignIn />} />

          {/* private routes */}
          <Route element={<RootLayout />}>
            <Route
              index
              element={
                <Suspense fallback={<Spinner />}>
                  <Home />
                </Suspense>
              }
            />
            <Route element={<ProtectedRoute />}>
              <Route
                path="budget/create"
                element={
                  <Suspense fallback={<Spinner />}>
                    <BudgetPage />
                  </Suspense>
                }
              />
            </Route>
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
  );
};

export default App;
