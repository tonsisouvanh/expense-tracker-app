import { Button, Checkbox, Form, Input, notification } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../store/features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const SignInPage = () => {
  const { status, error, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(signIn({ email: values.email, password: values.password }));
  };
  const onFinishFailed = () => {
    notification.warning({
      description: "Please input email and password",
    });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (status === "failed") {
      notification.error({
        description: error,
      });
    }
  }, [navigate, user, status, error]);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Form
        name="auth"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email address!",
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            loading={status === "loading"}
            type="primary"
            size="large"
            htmlType="submit"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignInPage;
