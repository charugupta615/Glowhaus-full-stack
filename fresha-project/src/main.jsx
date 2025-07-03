import 'antd/dist/reset.css'; 
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '@ant-design/v5-patch-for-react-19';
import 'antd/dist/reset.css'; 
import "react-calendar/dist/Calendar.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);