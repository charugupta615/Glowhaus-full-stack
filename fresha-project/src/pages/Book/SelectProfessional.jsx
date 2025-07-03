// import React, { useState } from "react";
// import { Card, Row, Col, Typography, Avatar, Drawer, Button, Divider } from "antd";
// import { StarFilled, TeamOutlined } from "@ant-design/icons";
// import pintuImage from "../../assets/images/pintu.jpg";
// import muhammadImage from "../../assets/images/muhammad.jpg";
// import arslanImage from "../../assets/images/arslan.jpg";
// import ahmadImage from "../../assets/images/ahmad.jpg";
// import rajImage from "../../assets/images/raj.jpg";

// const { Title, Text } = Typography;

// const professionals = [
//   {
//     id: "any",
//     name: "Any professional",
//     role: "For maximum availability",
//     image: <TeamOutlined style={{ fontSize: "40px", color: "#bbb" }} />,
//     rating: null,
//   },
//   {
//     id: "pintu",
//     name: "Pintu",
//     role: "Hair Stylist & Facialist",
//     image: pintuImage,
//     rating: 4.9,
//   },
//   {
//     id: "muhammad",
//     name: "Muhammad",
//     role: "Hair Stylist & Facialist",
//     image: muhammadImage,
//     rating: 4.9,
//   },
//   {
//     id: "arslan",
//     name: "Arslan",
//     role: "Hair Stylist & Facialist",
//     image: arslanImage,
//     rating: 5.0,
//   },
//   {
//     id: "ahmad",
//     name: "Ahmad",
//     role: "Hair Stylist & Facialist",
//     image: ahmadImage,
//     rating: 5.0,
//   },
//   {
//     id: "raj",
//     name: "Raj",
//     role: "Hairstylist",
//     image: rajImage,
//     rating: 4.9,
//   },
// ];

// const SelectProfessional = () => {
//   const [selectedPro, setSelectedPro] = useState(null);
//   const [drawerVisible, setDrawerVisible] = useState(false);

//   const handleSelect = (pro) => {
//     setSelectedPro(pro);
//     setDrawerVisible(true);
//   };

//   return (
//     <div style={{ padding: "40px" }}>
//       <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
//         Select Professional
//       </Title>
//       <Row gutter={[24, 24]} justify="center">
//         {professionals.map((pro) => (
//           <Col xs={24} sm={12} md={8} lg={6} key={pro.id}>
//             <Card
//               hoverable
//               bordered
//               style={{
//                 textAlign: "center",
//                 borderRadius: "12px",
//                 border: selectedPro?.id === pro.id ? "2px solid #8A5CF5" : "1px solid #ddd",
//                 transition: "0.3s",
//               }}
//             >
//               {typeof pro.image === "string" ? (
//                 <Avatar src={pro.image} size={64} />
//               ) : (
//                 <Avatar size={64} icon={pro.image} />
//               )}
//               <Title level={5} style={{ marginTop: "10px" }}>{pro.name}</Title>
//               <Text type="secondary">{pro.role}</Text>
//               {pro.rating && (
//                 <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
//                   <StarFilled style={{ color: "#FFD700", marginRight: "5px" }} />
//                   <Text strong>{pro.rating}</Text>
//                 </div>
//               )}
//               <Button 
//                 type="primary" 
//                 block 
//                 style={{ marginTop: "15px", backgroundColor: "#8A5CF5", borderColor: "#8A5CF5" }} 
//                 onClick={() => handleSelect(pro)}
//               >
//                 Book Now
//               </Button>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Right-Side Drawer for Booking Summary */}
//       <Drawer
//         title="Booking Summary"
//         placement="right"
//         closable
//         onClose={() => setDrawerVisible(false)}
//         visible={drawerVisible}
//         width={350}
//       >
//         {selectedPro && (
//           <>
//             <Title level={4}>{selectedPro.name}</Title>
//             <Text type="secondary">{selectedPro.role}</Text>
//             {selectedPro.rating && (
//               <div style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
//                 <StarFilled style={{ color: "#FFD700", marginRight: "5px" }} />
//                 <Text strong>{selectedPro.rating}</Text>
//               </div>
//             )}
//             <Divider />
//             <div>
//               <Title level={5}>Haircut</Title>
//               <Text>30 mins with {selectedPro.name}</Text>
//               <br />
//               <Title level={4} style={{ marginTop: "10px" }}>BHD 6</Title>
//             </div>
//             <Divider />
//             <Button type="primary" block style={{ backgroundColor: "#000" }}>
//               Continue
//             </Button>
//           </>
//         )}
//       </Drawer>
//     </div>
//   );
// };

// export default SelectProfessional;






import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { Card, Row, Col, Typography, Avatar, Button, Divider } from "antd";
import { StarFilled, TeamOutlined } from "@ant-design/icons";
import pintuImage from "../../assets/images/pintu.jpg";
import muhammadImage from "../../assets/images/muhammad.jpg";
import arslanImage from "../../assets/images/arslan.jpg";
import ahmadImage from "../../assets/images/ahmad.jpg";
import rajImage from "../../assets/images/raj.jpg";

const { Title, Text } = Typography;

const professionals = [
  {
    id: "any",
    name: "Any professional",
    role: "For maximum availability",
    image: <TeamOutlined style={{ fontSize: "40px", color: "#bbb" }} />,
    rating: null,
  },
  {
    id: "pintu",
    name: "Pintu",
    role: "Hair Stylist & Facialist",
    image: pintuImage,
    rating: 4.9,
  },
  {
    id: "muhammad",
    name: "Muhammad",
    role: "Hair Stylist & Facialist",
    image: muhammadImage,
    rating: 4.9,
  },
  {
    id: "arslan",
    name: "Arslan",
    role: "Hair Stylist & Facialist",
    image: arslanImage,
    rating: 5.0,
  },
  {
    id: "ahmad",
    name: "Ahmad",
    role: "Hair Stylist & Facialist",
    image: ahmadImage,
    rating: 5.0,
  },
  {
    id: "raj",
    name: "Raj",
    role: "Hairstylist",
    image: rajImage,
    rating: 4.9,
  },
];

const SelectProfessional = () => {
  const [selectedPro, setSelectedPro] = useState(professionals[0]);
  const navigate = useNavigate(); // ✅ Initialize useNavigate

  const handleContinue = () => {
    navigate("/select-time"); // ✅ Navigate to next page
  };

  return (
    <div style={{ display: "flex", padding: "80px" }}>
      {/* Left Side - Professional Selection */}
      <div style={{ flex: 1, marginRight: "20px" }}>
        <Title level={2} style={{ textAlign: "left", marginBottom: "30px", fontWeight:"bold", fontSize:"40px" }}>
          Select Professional
        </Title>
        <Row gutter={[24, 24]} justify="center">
          {professionals.map((pro) => (
            <Col xs={24} sm={12} md={8} lg={6} key={pro.id}>
              <Card
                hoverable
                bordered
                onClick={() => setSelectedPro(pro)}
                style={{
                  textAlign: "center",
                  borderRadius: "12px",
                  border: selectedPro?.id === pro.id ? "2px solid #8A5CF5" : "1px solid #ddd",
                  transition: "0.3s",
                }}
              >
                {typeof pro.image === "string" ? (
                  <Avatar src={pro.image} size={64} />
                ) : (
                  <Avatar size={64} icon={pro.image} />
                )}
                <Title level={5} style={{ marginTop: "10px" }}>
                  {pro.name}
                </Title>
                <Text type="secondary">{pro.role}</Text>
                {pro.rating && (
                  <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <StarFilled style={{ color: "#FFD700", marginRight: "5px" }} />
                    <Text strong>{pro.rating}</Text>
                  </div>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      
      {/* Right Side - Booking Summary */}
      <div style={{ flex: "0 0 30%",  width: "350px", borderLeft: "1px solid #ddd", paddingLeft: "20px", marginTop: "70px" }}>
        <Title level={3}>Booking Summary</Title>
        {selectedPro && (
          <>
            <Title level={4}>{selectedPro.name}</Title>
            <Text type="secondary">{selectedPro.role}</Text>
            {selectedPro.rating && (
              <div style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
                <StarFilled style={{ color: "#FFD700", marginRight: "5px" }} />
                <Text strong>{selectedPro.rating}</Text>
              </div>
            )}
            <Divider />
            <div>
              <Title level={5}>Haircut</Title>
              <Text>30 mins with {selectedPro.name}</Text>
              <br />
              <Title level={4} style={{ marginTop: "10px" }}>BHD 6</Title>
            </div>
            <Divider />
            <Button type="primary" block style={{ backgroundColor: "#000" }} onClick={handleContinue}>
              Continue
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default SelectProfessional;
