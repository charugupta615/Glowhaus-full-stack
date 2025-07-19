// import React, { useEffect, useState } from 'react';
// import {
//   Table,
//   Image,
//   Button,
//   Space,
//   Modal,
//   Form,
//   Input,
//   Select,
//   Upload,
//   message,
//   Popconfirm,
//   Switch, 
// } from 'antd';
// import axios from 'axios';
// import {
//   PlusOutlined,
//   UploadOutlined,
//   EyeOutlined,
//   EditOutlined,
//   DeleteOutlined,
// } from '@ant-design/icons';

// const { Option } = Select;

// const BusinessTable = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [sections, setSections] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const [form] = Form.useForm();
//   const [fileList, setFileList] = useState([]);
//   const [mainImage, setMainImage] = useState([]);
//   const [sideImage, setSideImage] = useState([]);
//   const [sideImage1, setSideImage1] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [sectionFilter, setSectionFilter] = useState('');
//   const [editingBusiness, setEditingBusiness] = useState(null);
//   const [previewBusiness, setPreviewBusiness] = useState(null);

//   useEffect(() => {
//     fetchBusinesses();
//     fetchCategories();
//   }, []);

//   const fetchBusinesses = async () => {
//     try {
//       const res = await axios.get('https://glowhaus-full-stack.onrender.com/api/display/display');
//       const allBusinesses = [];

//       res.data.sections.forEach((section) => {
//         section.business.forEach((biz) => {
//           allBusinesses.push({
//             ...biz,
//             section_id: section.id,
//             section_name: section.name,
//             category_id: biz.category?.id,
//             category_name: biz.category?.name,
//           });
//         });
//       });

//       setSections(res.data.sections);
//       setData(allBusinesses);
//       setFilteredData(allBusinesses);
//     } catch (error) {
//       console.error('Error fetching businesses:', error);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get('https://glowhaus-full-stack.onrender.com/api/categories/display');
//       setCategories(res.data);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const handleAddBusiness = () => {
//     setEditingBusiness(null);
//     form.resetFields();
//     setFileList([]);
//     setMainImage([]);
//     setSideImage([]);
//     setSideImage1([]);
//     setIsModalOpen(true);
//   };

//   const handleCancel = () => {
//     form.resetFields();
//     setFileList([]);
//     setMainImage([]);
//     setSideImage([]);
//     setSideImage1([]);
//     setIsModalOpen(false);
//   };

//   const handleFormSubmit = async (values) => {
//     const formData = new FormData();

//     Object.entries(values).forEach(([key, value]) => {
//       formData.append(key, value);
//     });
//     if (fileList.length > 0) {
//       formData.append('image', fileList[0].originFileObj);
//     }
//     if (mainImage[0]) formData.append('main_image', mainImage[0].originFileObj);
//     if (sideImage[0]) formData.append('side_image', sideImage[0].originFileObj);
//     if (sideImage1[0]) formData.append('side_image1', sideImage1[0].originFileObj);

//     try {
//       if (editingBusiness) {
//         await axios.put(
//           `https://glowhaus-full-stack.onrender.com/api/business/update/${editingBusiness.id}`,
//           formData,
//           { headers: { 'Content-Type': 'multipart/form-data' } }
//         );
//         message.success('Business updated successfully!');
//       } else {
//         await axios.post(
//           'https://glowhaus-full-stack.onrender.com/api/business/create',
//           formData,
//           { headers: { 'Content-Type': 'multipart/form-data' } }
//         );
//         message.success('Business added successfully!');
//       }

//       form.resetFields();
//       setFileList([]);
//       setMainImage([]);
//       setSideImage([]);
//       setSideImage1([]);
//       setIsModalOpen(false);
//       fetchBusinesses();
//     } catch (error) {
//       console.error('Error submitting business:', error);
//       message.error('Failed to submit business');
//     }
//   };

//   const handleEdit = (record) => {
//     setEditingBusiness(record);
//     form.setFieldsValue({
//       ...record,
//       category_id: record.category_id || undefined,
//       section_id: record.section_id || undefined,
//     });
//     setFileList([]);
//     setMainImage([]);
//     setSideImage([]);
//     setSideImage1([]);
//     setIsModalOpen(true);
//   };

//   const handlePreview = (record) => {
//     setPreviewBusiness(record);
//     setIsPreviewOpen(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`https://glowhaus-full-stack.onrender.com/api/business/delete/${id}`);
//       message.success('Business deleted successfully!');
//       fetchBusinesses();
//     } catch (error) {
//       console.error('Error deleting business:', error);
//       message.error('Failed to delete business');
//     }
//   };

//   const filterData = (statusText, sectionText) => {
//     if (!statusText && !sectionText) {
//       setFilteredData(data);
//       return;
//     }

//     const filtered = data.filter((item) => {
//       const status = item.status?.toLowerCase() || '';
//       const sectionName = item.section_name?.toLowerCase() || '';
//       const statusMatch = statusText ? status.includes(statusText) : true;
//       const sectionMatch = sectionText ? sectionName.includes(sectionText) : true;
//       return statusMatch && sectionMatch;
//     });

//     setFilteredData(filtered);
//   };

//   const handleStatusFilter = (value) => {
//     const clean = value?.toLowerCase() || '';
//     setStatusFilter(clean);
//     filterData(clean, sectionFilter);
//   };

//   const handleSectionFilter = (value) => {
//     const clean = value?.toLowerCase() || '';
//     setSectionFilter(clean);
//     filterData(statusFilter, clean);
//   };

//   const handleStatusChange = async (id, value) => {
//     try {
//       await axios.put(`https://glowhaus-full-stack.onrender.com/api/business/update-status/${id}`, { status: value });
//       message.success('Status updated');
//       fetchBusinesses();
//     } catch (err) {
//       message.error('Failed to update status');
//     }
//   };

//   const columns = [
//     {
//       title: 'Image',
//       dataIndex: 'main_image',
//       key: 'main_image',
//       render: (main_image) => <Image width={80} src={`https://glowhaus-full-stack.onrender.com${main_image}`} />,
//     },
//     { title: 'Name', dataIndex: 'name', key: 'name' },
//     { title: 'Slug', dataIndex: 'slug', key: 'slug' },
//     { title: 'Rating', dataIndex: 'average_rating', key: 'average_rating', render: (rating) => (isNaN(rating) || rating === null ? 0 : rating), },
//     { title: 'Votes', dataIndex: 'total_reviews', key: 'total_reviews', render: (votes) => (isNaN(votes) || votes === null ? 0 : votes), },
//     { title: 'Address', dataIndex: 'address', key: 'address' },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status, record) => (
//         <Switch
//           checked={status === 'active'}
//           checkedChildren="Active"
//           unCheckedChildren="Inactive"
//           onChange={(checked) =>
//             handleStatusChange(record.id, checked ? 'active' : 'inactive')
//           }
//         />
//       ),
//     },
//     { title: 'Category', dataIndex: 'category_name', key: 'category_name' },
//     { title: 'Section', dataIndex: 'section_name', key: 'section_name' },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space>
//           <Button icon={<EyeOutlined />} onClick={() => handlePreview(record)} />
//           <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
//           <Popconfirm title="Are you sure to delete?" onConfirm={() => handleDelete(record.id)}>
//             <Button icon={<DeleteOutlined />} danger />
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Space style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
//         <h2>All Businesses</h2>
//         <Button type="primary" icon={<PlusOutlined />} onClick={handleAddBusiness}>
//           Add Business
//         </Button>
//       </Space>

//       <Space style={{ marginBottom: 16 }}>
//         <Select allowClear style={{ width: 180 }} placeholder="Filter by Status" onChange={handleStatusFilter}>
//           <Option value="active">Active</Option>
//           <Option value="inactive">Inactive</Option>
//         </Select>

//         <Select allowClear style={{ width: 180 }} placeholder="Filter by Section" onChange={handleSectionFilter}>
//           {sections.map((section) => (
//             <Option key={section.id} value={section.name.toLowerCase()}>{section.name}</Option>
//           ))}
//         </Select>
//       </Space>

//       <Table columns={columns} dataSource={filteredData} rowKey="id" />

//       {/* Modal for Add/Edit */}
//       <Modal
//         title={editingBusiness ? 'Edit Business' : 'Add New Business'}
//         open={isModalOpen}
//         onCancel={handleCancel}
//         onOk={() => form.submit()}
//         okText={editingBusiness ? 'Update' : 'Create'}
//         cancelText="Cancel"
//       >
//         <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
//           <Form.Item name="name" label="Business Name" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>

//           <Form.Item name="slug" label="Slug" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>

//           {/* <Form.Item label="Image">
//             <Upload
//               beforeUpload={() => false}
//               fileList={fileList}
//               onChange={({ fileList }) => setFileList(fileList)}
//               accept="image/*"
//               maxCount={1}
//             >
//               <Button icon={<UploadOutlined />}>Select Image</Button>
//             </Upload>
//           </Form.Item> */}

//           <Form.Item name="address" label="Address" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>

//           <Form.Item name="category_id" label="Category" rules={[{ required: true }]}>
//             <Select placeholder="Select Category">
//               {categories.map((cat) => (
//                 <Option key={cat.id} value={cat.id}>{cat.name}</Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item name="section_id" label="Section" rules={[{ required: true }]}>
//             <Select placeholder="Select Section">
//               {sections.map((section) => (
//                 <Option key={section.id} value={section.id}>{section.name}</Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item label="Main Image">
//             <Upload
//               beforeUpload={() => false}
//               fileList={mainImage}
//               onChange={({ fileList }) => setMainImage(fileList)}
//               accept="image/*"
//               maxCount={1}
//             >
//               <Button icon={<UploadOutlined />}>Select Main Image</Button>
//             </Upload>
//           </Form.Item>

//           <Form.Item label="Side Image">
//             <Upload
//               beforeUpload={() => false}
//               fileList={sideImage}
//               onChange={({ fileList }) => setSideImage(fileList)}
//               accept="image/*"
//               maxCount={1}
//             >
//               <Button icon={<UploadOutlined />}>Select Side Image</Button>
//             </Upload>
//           </Form.Item>

//           <Form.Item label="Side Image 1">
//             <Upload
//               beforeUpload={() => false}
//               fileList={sideImage1}
//               onChange={({ fileList }) => setSideImage1(fileList)}
//               accept="image/*"
//               maxCount={1}
//             >
//               <Button icon={<UploadOutlined />}>Select Side Image 1</Button>
//             </Upload>
//           </Form.Item>
//         </Form>
//       </Modal>

//       {/* Preview Modal */}
//       <Modal
//         open={isPreviewOpen}
//         onCancel={() => setIsPreviewOpen(false)}
//         footer={null}
//         title="Business Preview"
//       >
//         {previewBusiness && (
//           <div>
//             <Image width={200} src={`https://glowhaus-full-stack.onrender.com${previewBusiness.image}`} />
//             <p><strong>Name:</strong> {previewBusiness.name}</p>
//             <p><strong>Slug:</strong> {previewBusiness.slug}</p>
//             <p><strong>Address:</strong> {previewBusiness.address}</p>
//             <p><strong>Rating:</strong> {previewBusiness.average_rating}</p>
//             <p><strong>Votes:</strong> {previewBusiness.total_reviews}</p>
//             <p><strong>Status:</strong> {previewBusiness.status}</p>
//             <p><strong>Category:</strong> {previewBusiness.category_name}</p>
//             <p><strong>Section:</strong> {previewBusiness.section_name}</p>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default BusinessTable;




import React, { useEffect, useState } from 'react';
import {
  Table,
  Image,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  message,
  Popconfirm,
  Switch,
} from 'antd';
import axios from 'axios';
import {
  PlusOutlined,
  UploadOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // ✅ import useNavigate

const { Option } = Select;

const BusinessTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sections, setSections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [mainImage, setMainImage] = useState([]);
  const [sideImage, setSideImage] = useState([]);
  const [sideImage1, setSideImage1] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');
  const [editingBusiness, setEditingBusiness] = useState(null);
  const [previewBusiness, setPreviewBusiness] = useState(null);

  const navigate = useNavigate(); // ✅ hook for navigation

  useEffect(() => {
    fetchBusinesses();
    fetchCategories();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const res = await axios.get('https://glowhaus-full-stack.onrender.com/api/display/display');
      const allBusinesses = [];

      res.data.sections.forEach((section) => {
        section.business.forEach((biz) => {
          allBusinesses.push({
            ...biz,
            section_id: section.id,
            section_name: section.name,
            category_id: biz.category?.id,
            category_name: biz.category?.name,
          });
        });
      });

      setSections(res.data.sections);
      setData(allBusinesses);
      setFilteredData(allBusinesses);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('https://glowhaus-full-stack.onrender.com/api/categories/display');
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddBusiness = () => {
    setEditingBusiness(null);
    form.resetFields();
    setFileList([]);
    setMainImage([]);
    setSideImage([]);
    setSideImage1([]);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setMainImage([]);
    setSideImage([]);
    setSideImage1([]);
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (mainImage[0]) formData.append('main_image', mainImage[0].originFileObj);
    if (sideImage[0]) formData.append('side_image', sideImage[0].originFileObj);
    if (sideImage1[0]) formData.append('side_image1', sideImage1[0].originFileObj);

    try {
      if (editingBusiness) {
        await axios.put(
          `https://glowhaus-full-stack.onrender.com/api/business/update/${editingBusiness.id}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        message.success('Business updated successfully!');
      } else {
        await axios.post(
          'https://glowhaus-full-stack.onrender.com/api/business/create',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        message.success('Business added successfully!');
      }

      form.resetFields();
      setMainImage([]);
      setSideImage([]);
      setSideImage1([]);
      setIsModalOpen(false);
      fetchBusinesses();
    } catch (error) {
      console.error('Error submitting business:', error);
      message.error('Failed to submit business');
    }
  };

  const handleEdit = (record) => {
    setEditingBusiness(record);
    form.setFieldsValue({
      ...record,
      category_id: record.category_id || undefined,
      section_id: record.section_id || undefined,
    });
    setMainImage([]);
    setSideImage([]);
    setSideImage1([]);
    setIsModalOpen(true);
  };

  const handlePreview = (record) => {
    setPreviewBusiness(record);
    setIsPreviewOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://glowhaus-full-stack.onrender.com/api/business/delete/${id}`);
      message.success('Business deleted successfully!');
      fetchBusinesses();
    } catch (error) {
      console.error('Error deleting business:', error);
      message.error('Failed to delete business');
    }
  };

  const filterData = (statusText, sectionText) => {
    if (!statusText && !sectionText) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item) => {
      const status = item.status?.toLowerCase() || '';
      const sectionName = item.section_name?.toLowerCase() || '';
      const statusMatch = statusText ? status.includes(statusText) : true;
      const sectionMatch = sectionText ? sectionName.includes(sectionText) : true;
      return statusMatch && sectionMatch;
    });

    setFilteredData(filtered);
  };

  const handleStatusFilter = (value) => {
    const clean = value?.toLowerCase() || '';
    setStatusFilter(clean);
    filterData(clean, sectionFilter);
  };

  const handleSectionFilter = (value) => {
    const clean = value?.toLowerCase() || '';
    setSectionFilter(clean);
    filterData(statusFilter, clean);
  };

  const handleStatusChange = async (id, value) => {
    try {
      await axios.put(`https://glowhaus-full-stack.onrender.com/api/business/update-status/${id}`, { status: value });
      message.success('Status updated');
      fetchBusinesses();
    } catch (err) {
      message.error('Failed to update status');
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'main_image',
      key: 'main_image',
      render: (main_image) => <Image width={80} src={`https://glowhaus-full-stack.onrender.com${main_image}`} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <a onClick={() => navigate(`/business/${record.id}`)} style={{ color: '#1890ff' }}>
          {record.name}
        </a>
      ),
    },
    { title: 'Slug', dataIndex: 'slug', key: 'slug' },
    {
      title: 'Rating',
      dataIndex: 'average_rating',
      key: 'average_rating',
      render: (rating) => (isNaN(rating) || rating === null ? 0 : rating),
    },
    {
      title: 'Votes',
      dataIndex: 'total_reviews',
      key: 'total_reviews',
      render: (votes) => (isNaN(votes) || votes === null ? 0 : votes),
    },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Switch
          checked={status === 'active'}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          onChange={(checked) =>
            handleStatusChange(record.id, checked ? 'active' : 'inactive')
          }
        />
      ),
    },
    { title: 'Category', dataIndex: 'category_name', key: 'category_name' },
    { title: 'Section', dataIndex: 'section_name', key: 'section_name' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => navigate(`/business/${record.id}`)} />
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm title="Are you sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2>All Businesses</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddBusiness}>
          Add Business
        </Button>
      </Space>

      <Space style={{ marginBottom: 16 }}>
        <Select allowClear style={{ width: 180 }} placeholder="Filter by Status" onChange={handleStatusFilter}>
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>

        <Select allowClear style={{ width: 180 }} placeholder="Filter by Section" onChange={handleSectionFilter}>
          {sections.map((section) => (
            <Option key={section.id} value={section.name.toLowerCase()}>{section.name}</Option>
          ))}
        </Select>
      </Space>

      <Table columns={columns} dataSource={filteredData} rowKey="id" />

      {/* Modal for Add/Edit */}
      <Modal
        title={editingBusiness ? 'Edit Business' : 'Add New Business'}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        okText={editingBusiness ? 'Update' : 'Create'}
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item name="name" label="Business Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="slug" label="Slug" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="address" label="Address" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="category_id" label="Category" rules={[{ required: true }]}>
            <Select placeholder="Select Category">
              {categories.map((cat) => (
                <Option key={cat.id} value={cat.id}>{cat.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="section_id" label="Section" rules={[{ required: true }]}>
            <Select placeholder="Select Section">
              {sections.map((section) => (
                <Option key={section.id} value={section.id}>{section.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Main Image">
            <Upload
              beforeUpload={() => false}
              fileList={mainImage}
              onChange={({ fileList }) => setMainImage(fileList)}
              accept="image/*"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Select Main Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Side Image">
            <Upload
              beforeUpload={() => false}
              fileList={sideImage}
              onChange={({ fileList }) => setSideImage(fileList)}
              accept="image/*"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Select Side Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Side Image 1">
            <Upload
              beforeUpload={() => false}
              fileList={sideImage1}
              onChange={({ fileList }) => setSideImage1(fileList)}
              accept="image/*"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Select Side Image 1</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* Preview Modal */}
      <Modal
        open={isPreviewOpen}
        onCancel={() => setIsPreviewOpen(false)}
        footer={null}
        title="Business Preview"
      >
        {previewBusiness && (
          <div>
            <Image width={200} src={`https://glowhaus-full-stack.onrender.com${previewBusiness.image}`} />
            <p><strong>Name:</strong> {previewBusiness.name}</p>
            <p><strong>Slug:</strong> {previewBusiness.slug}</p>
            <p><strong>Address:</strong> {previewBusiness.address}</p>
            <p><strong>Rating:</strong> {previewBusiness.average_rating}</p>
            <p><strong>Votes:</strong> {previewBusiness.total_reviews}</p>
            <p><strong>Status:</strong> {previewBusiness.status}</p>
            <p><strong>Category:</strong> {previewBusiness.category_name}</p>
            <p><strong>Section:</strong> {previewBusiness.section_name}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BusinessTable;
