import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import supabase from "../lib/supabase";
const SignIn = () => {
  const onFinish = (values) => {
    const signinUser = async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.username,
        password: values.password,
      });
    };

    signinUser();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleLogout = () => {
    const logUserOut = async () => {
      const { error } = await supabase.auth.signOut({ scope: "local" });
      if (!error) {
        localStorage.clear();
      }
    };
    logUserOut();
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
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
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
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
        <Input.Password />
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <Button onClick={handleLogout} type="primary" htmlType="button">
        Logout
      </Button>
    </Form>
  );
};

export default SignIn;
