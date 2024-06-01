import { Outlet, useLocation } from "react-router-dom";
import BottomBar from "../components/BottomBar";
import HomeTopbar from "../components/topbar/HomeTopbar";
const RootLayout = () => {
  const hideBottombarPath = ["/category/setting"];
  const { pathname } = useLocation();

  const renderTopbar = () => {
    if (pathname === "/") return <HomeTopbar />;
  };

  return (
    <div className="w-full flex flex-col md:flex">
      {renderTopbar()}
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      {hideBottombarPath.includes(pathname) ? null : <BottomBar />}
    </div>
  );
};

export default RootLayout;
