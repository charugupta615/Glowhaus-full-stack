import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const Services = () => {
  const [services, setServices] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [businessId, setBusinessId] = useState(null);
  const [selectedServiceType, setSelectedServiceType] = useState(null); // NEW
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isServiceTypeModalOpen, setIsServiceTypeModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [form] = Form.useForm();
  const [serviceTypeForm] = Form.useForm();

  const fetchServices = async (businessId) => {
    try {
      let res;
      if (businessId) {
        res = await axios.get(`https://glowhaus-full-stack.onrender.com/api/service/business/${businessId}`);
      } else {
        res = await axios.get('https://glowhaus-full-stack.onrender.com/api/service/display');
      }
      setServices(res.data);
    } catch (err) {
      message.error('Failed to load services');
    }
  };

  const fetchBusinesses = async () => {
    try {
      const res = await axios.get('https://glowhaus-full-stack.onrender.com/api/business/display');
      if (res.data && Array.isArray(res.data)) {
        setBusinesses(res.data.map(item => item.business));
      }
    } catch (err) {
      message.error('Failed to load businesses');
    }
  };

  const fetchServiceTypes = async (businessId) => {
    if (!businessId) return;
    try {
      const res = await axios.get(`https://glowhaus-full-stack.onrender.com/api/service-type/business/${businessId}`);
      if (res.data && Array.isArray(res.data)) {
        setServiceTypes(res.data);
      } else {
        message.error('No service types available');
      }
    } catch (err) {
      message.error('Failed to load service types');
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  useEffect(() => {
    fetchServices(businessId);
    if (businessId) {
      fetchServiceTypes(businessId);
    } else {
      setServiceTypes([]);
    }
    setSelectedServiceType(null); // reset filter on business change
  }, [businessId]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://glowhaus-full-stack.onrender.com/api/service/delete/${id}`);
      message.success('Service deleted');
      fetchServices(businessId);
    } catch {
      message.error('Failed to delete service');
    }
  };

  const openModal = (service = null) => {
    setEditingService(service);
    if (service) {
      form.setFieldsValue({ ...service, business_id: service.business_id });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleFinish = async (values) => {
    try {
      if (editingService) {
        await axios.put(`https://glowhaus-full-stack.onrender.com/api/service/update/${editingService.id}`, values);
        message.success('Service updated');
      } else {
        await axios.post('https://glowhaus-full-stack.onrender.com/api/service/create', values);
        message.success('Service created');
      }
      fetchServices(businessId);
      setIsModalOpen(false);
    } catch (err) {
      message.error('Failed to save service');
    }
  };

  const handleServiceTypeFinish = async (values) => {
    try {
      await axios.post('https://glowhaus-full-stack.onrender.com/api/service-type/create', {
        ...values,
        business_id: businessId
      });
      message.success('Service type created');
      fetchServiceTypes(businessId);
      setIsServiceTypeModalOpen(false);
    } catch (err) {
      message.error('Failed to create service type');
    }
  };

  const filteredServices = selectedServiceType
    ? services.filter(service => service.service_type_id === selectedServiceType)
    : services;

  const columns = [
    { title: 'Service Name', dataIndex: 'service_name' },
    { title: 'Price', dataIndex: 'price' },
    { title: 'Duration', dataIndex: 'duration' },
    {
      title: 'Actions',
      render: (_, record) => (
        <>
          <Button size="small" onClick={() => openModal(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this service?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger size="small" style={{ marginLeft: 8 }}>Delete</Button>
          </Popconfirm>
        </>
      )
    }
  ];

  return (
    <div>
      {/* Business Dropdown */}
      <Select
        value={businessId}
        onChange={setBusinessId}
        placeholder="Select a Business"
        style={{ width: 200}}
        allowClear
      >
        <Option value={null}>All Businesses</Option>
        {businesses.map((biz) => (
          <Option key={biz.id} value={biz.id}>
            {biz.name}
          </Option>
        ))}
      </Select>

      {/* Service Type Filter Dropdown */}
      <Select
        value={selectedServiceType}
        onChange={setSelectedServiceType}
        placeholder="Filter by Service Type"
        style={{ width: 200,  marginLeft: 8 }}
        allowClear
        disabled={!businessId}
      >
        {serviceTypes.map((type) => (
          <Option key={type.id} value={type.id}>
            {type.service_type}
          </Option>
        ))}
      </Select>

      {/* Add Buttons */}
      <div
  style={{
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 8,
  }}
>
  <Button
    type="primary"
    icon={<PlusOutlined />}
    onClick={() => openModal()}
    disabled={!businessId}
  >
    Add Service
  </Button>

  <Button
    type="primary"
    icon={<PlusOutlined />}
    onClick={() => setIsServiceTypeModalOpen(true)}
    disabled={!businessId}
  >
    Add Service Type
  </Button>
</div>


      {/* Services Table */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredServices}
        style={{ marginTop: 16 }}
      />

      {/* Modal for Add/Edit Service */}
      <Modal
        title={editingService ? 'Edit Service' : 'Add Service'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="business_id" label="Business" initialValue={businessId}>
            <Select disabled>
              <Option value={businessId}>{businesses.find(biz => biz.id === businessId)?.name}</Option>
            </Select>
          </Form.Item>

          <Form.Item name="service_type_id" label="Service Type" rules={[{ required: true }]}>
            <Select placeholder="Select a service type">
              {serviceTypes.map((type) => (
                <Option key={type.id} value={type.id}>
                  {type.service_type}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="service_name" label="Service Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="duration" label="Duration" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for Add Service Type */}
      <Modal
        title="Add Service Type"
        open={isServiceTypeModalOpen}
        onCancel={() => setIsServiceTypeModalOpen(false)}
        onOk={() => serviceTypeForm.submit()}
        okText="Submit"
      >
        <Form form={serviceTypeForm} layout="vertical" onFinish={handleServiceTypeFinish}>
          <Form.Item name="service_type" label="Service Type" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Services;
