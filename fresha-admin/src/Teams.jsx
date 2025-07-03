import React, { useEffect, useState } from 'react';
import {
  Table, Button, Modal, Form, Input, Upload, message, Popconfirm, Rate, Select
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;
const API_BASE = 'http://localhost:5000/api/team';

const Teams = () => {
  const [team, setTeam] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [form] = Form.useForm();

  // Fetch all team members
  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/display`);
      setTeam(res.data);
    } catch (err) {
      message.error('Failed to load team');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all businesses
  const fetchBusinesses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/business/display');
      if (res.data && Array.isArray(res.data)) {
        // Map over the response and extract business names and IDs
        const businessList = res.data.map(item => item.business);
        setBusinesses(businessList);
      } else {
        message.error('No businesses found.');
      }
    } catch (err) {
      message.error('Failed to load businesses');
    }
  };

  useEffect(() => {
    fetchTeam();
    fetchBusinesses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/delete/${id}`);
      message.success('Team member deleted');
      fetchTeam();
    } catch {
      message.error('Delete failed');
    }
  };

  const openModal = (member = null) => {
    setEditingMember(member);
    if (member) {
      form.setFieldsValue({ ...member, rating: Number(member.rating), business_id: member.business_id });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleFinish = async (values) => {
    const formData = new FormData();
    for (let key in values) {
      if (key === 'photo' && values.photo?.file) {
        formData.append('photo', values.photo.file);
      } else {
        formData.append(key, values[key]);
      }
    }

    try {
      if (editingMember) {
        await axios.put(`${API_BASE}/update/${editingMember.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        message.success('Team member updated');
      } else {
        await axios.post(`${API_BASE}/create`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        message.success('Team member created');
      }
      fetchTeam();
      setIsModalOpen(false);
    } catch {
      message.error('Operation failed');
    }
  };

  const columns = [
    {
      title: 'Photo',
      dataIndex: 'photo',
      render: (photo) =>
        photo ? (
          <img src={`http://localhost:5000/${photo}`} alt="Team" width={50} />
        ) : 'No Photo',
    },
    { title: 'Name', dataIndex: 'team_name' },
    { title: 'Role', dataIndex: 'role' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Phone', dataIndex: 'phone' },
    {
      title: 'Rating',
      dataIndex: 'rating',
      render: (rating) => <Rate disabled defaultValue={Number(rating)} />,
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <>
          <Button size="small" onClick={() => openModal(record)}>Edit</Button>
          <Popconfirm
            title="Delete this team member?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger size="small" style={{ marginLeft: 8 }}>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()}>
        Add Team Member
      </Button>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={team}
        loading={loading}
        style={{ marginTop: 16 }}
      />

      <Modal
        title={editingMember ? 'Edit Team Member' : 'Add Team Member'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="business_id" label="Business" rules={[{ required: true }]}>
            <Select placeholder="Select a business">
              {businesses.map((biz) => (
                <Option key={biz.id} value={biz.id}>
                  {biz.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="team_name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="rating" label="Rating">
            <Rate />
          </Form.Item>
          <Form.Item name="photo" label="Photo" valuePropName="file">
            <Upload beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Teams;
