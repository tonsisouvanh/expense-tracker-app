// ProtectedRoute.js
import { Navigate, Outlet } from "react-router-dom";
// import { supabase } from "./supabaseClient";

const ProtectedRoute = () => {
  //   const session = supabase.auth.session();
  const session = null;
  return session ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
