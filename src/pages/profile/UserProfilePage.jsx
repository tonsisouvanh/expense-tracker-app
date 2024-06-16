import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../store/features/auth/authSlice";
import { UserOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await dispatch(signOut()).unwrap();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="rounded-lg p-8 text-center shadow-md">
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
            <UserOutlined className="text-3xl" />
          </div>
        </div>
        <h3 className="mb-2 text-xl font-semibold">{user?.name}</h3>
        <p className="mb-6 text-gray-300">{user?.email}</p>
        <Button type="primary" onClick={handleLogout}>
          LOGOUT
        </Button>
      </div>
    </div>
  );
};

export default UserProfilePage;
