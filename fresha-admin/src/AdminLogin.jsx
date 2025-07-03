import React, { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Change to your backend API URL

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    axios
      .post(`${API_BASE_URL}/api/admin/login`, values)
      .then((res) => {
        message.success("Login successful");

        // Assuming the backend response contains these properties
        const adminName = res.data.admin.name;

        // Store the admin's name and token in localStorage
        localStorage.setItem("adminToken", res.data.token);
        console.log("Admin Name:", adminName);
        localStorage.setItem("adminName", res.data.admin.name);
        
        window.location.href = "/"; // Redirect to home or dashboard after login
      })
      .catch((err) => {
        message.error(err.response?.data?.message || "Login failed");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <Card title="Admin Login" style={{ width: 400 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input placeholder="admin@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AdminLogin;
