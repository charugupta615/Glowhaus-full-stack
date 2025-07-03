// import React, { useState } from 'react';
// import { Form, Input, Button, message } from 'antd';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const BusinessLogin = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (values) => {
//     setLoading(true);
//     try {
//       const res = await axios.post('http://localhost:5000/api/businessUser/login', values);
//       const { token } = res.data;
//       localStorage.setItem('business_token', token); // Store token in localStorage
//       message.success('Login successful!');
//       navigate('/business/dashboard'); // Redirect to business dashboard
//     } catch (error) {
//       message.error('Login failed, please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Form layout="vertical" onFinish={handleLogin}>
//       <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
//         <Input />
//       </Form.Item>
//       <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
//         <Input.Password />
//       </Form.Item>
//       <Button type="primary" htmlType="submit" loading={loading}>Login</Button>
//     </Form>
//   );
// };

// export default BusinessLogin;



import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BusinessLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    axios
      .post("http://localhost:5000/api/business/login", values)
      .then((res) => {
        message.success("Login successful");
        localStorage.setItem("businessToken", res.data.token);
        localStorage.setItem("businessName", res.data.business.name);
        localStorage.setItem("businessId", res.data.business.id);
        navigate("/business/dashboard");
      })
      .catch((err) => {
        console.error(err);
        message.error(err.response?.data?.message || "Login failed");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto" }}>
      <h2>Business Login</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BusinessLogin;
