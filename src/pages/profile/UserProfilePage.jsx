import { Button } from "antd";
import { useDispatch } from "react-redux";
import { signOut } from "../../store/features/auth/authSlice";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Button type="primary" onClick={() => dispatch(signOut())}>
        LOGOUT
      </Button>
    </div>
  );
};

export default UserProfilePage;
