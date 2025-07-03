import React, { useState } from "react";
import { Button, Modal, Card, DatePicker, message } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "antd/dist/reset.css";

import pintu from '../../assets/images/pintu.jpg';
import muhammad from '../../assets/images/muhammad.jpg';
import arslan from '../../assets/images/arslan.jpg';
import ahmad from '../../assets/images/ahmad.jpg';
import raj from '../../assets/images/raj.jpg';

const professionals = [
  { name: "Pintu", role: "Hair Stylist & Face", rating: 4.9, image: pintu },
  { name: "Muhammad", role: "Hair Stylist & Face", rating: 4.9, image: muhammad },
  { name: "Arslan", role: "Hair Stylist & Face", rating: 5.0, image: arslan },
  { name: "Ahmad", role: "Hair Stylist & Face", rating: 5.0, image: ahmad },
  { name: "Raj", role: "Hairstylist", rating: 5.0, image: raj }
];

const checkAvailability = (date) => date.day() !== 0;

const generateTimeSlots = () => Array.from({ length: 18 }, (_, i) => `${9 + Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'} ${9 + Math.floor(i / 2) < 12 ? 'AM' : 'PM'}`);

const SelectTime = () => {
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [available, setAvailable] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const handleProfessionalSelect = (pro) => {
    setSelectedProfessional(pro);
    setIsModalVisible(false);
  };

  const handleDateChange = (date) => {
    if (!date) return;
    setSelectedDate(date);
    const isAvailable = checkAvailability(date);
    setAvailable(isAvailable);
    if (!isAvailable) message.error("No availability on this date. Please select another.");
  };

  const findNextAvailableDate = () => {
    let nextDate = selectedDate ? dayjs(selectedDate).add(1, 'day') : dayjs().add(1, 'day');
    while (!checkAvailability(nextDate)) {
      nextDate = nextDate.add(1, 'day');
    }
    setSelectedDate(nextDate);
    setAvailable(true);
  };

  return (
    <div style={{ display: 'flex', padding: '40px' }}>
      <div style={{ flex: 2, paddingLeft: '40px' }}>
        <h2 style={{fontSize:'35px', marginTop:'20px', paddingLeft:'30px'}}><b>Select Time</b></h2>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', paddingLeft:'30px' }}>
          <Button onClick={() => setIsModalVisible(true)}>
            {selectedProfessional ? selectedProfessional.name : "Select Professional"} <DownOutlined />
          </Button>
          <DatePicker onChange={handleDateChange} disabledDate={(date) => date.isBefore(dayjs())} value={selectedDate} />
        </div>

        <Modal title="Select Professional" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
            <Card onClick={() => handleProfessionalSelect(null)} style={{ border: !selectedProfessional ? '2px solid purple' : '1px solid #ddd', cursor: 'pointer', textAlign: 'center' }}>
              <UserOutlined style={{ fontSize: '40px', color: '#999' }} />
              <p>Any Professional</p>
              <span style={{ color: '#999' }}>Maximum availability</span>
            </Card>
            {professionals.map((pro) => (
              <Card key={pro.name} onClick={() => handleProfessionalSelect(pro)} style={{ border: selectedProfessional?.name === pro.name ? '2px solid purple' : '1px solid #ddd', cursor: 'pointer', textAlign: 'center' }}>
                <img src={pro.image} alt={pro.name} style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
                <p><b>{pro.name}</b> ({pro.rating}⭐)</p>
                <span>{pro.role}</span>
              </Card>
            ))}
          </div>
        </Modal>

        {!available && selectedDate && (
          <div>
            <p>No availability on this date. Please select another.</p>
            <Button onClick={findNextAvailableDate}>Select Another Date</Button>
            <Button onClick={() => setIsModalVisible(true)} style={{ marginLeft: '10px' }}>Choose Professional</Button>
          </div>
        )}

        {selectedDate && available && (
          <div>
            <h3 style={{paddingLeft:'30px', marginBottom:'20px', fontSize:'30px'}}>Select Time Slot</h3>
            <div style={{ maxHeight: '300px', padding: '20px' }}>
              {generateTimeSlots().map(slot => (
                <div key={slot} style={{ marginBottom: '10px' }}>
                  <Button style={{ width: '70%', height: '80px', marginLeft: '20px', borderRadius: '10px', fontSize: '16px' }} type={selectedTimeSlot === slot ? 'primary' : 'default'} onClick={() => setSelectedTimeSlot(slot)}>{slot}</Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ flex:1, border: "1px solid #ddd", padding: 20, borderRadius: 8, height: 'fit-content' }}>
        <h3>Booking Summary</h3>
        {selectedProfessional ? (
          <>
            <p><b>{selectedProfessional.name}</b> - {selectedProfessional.role}</p>
            <p>Rating: {selectedProfessional.rating} ⭐</p>
            <img src={selectedProfessional.image} alt={selectedProfessional.name} style={{ width: '80px', borderRadius: '50%' }} />
          </>
        ) : <p>Any Professional Selected</p>}
        {selectedDate && <p>Date: {selectedDate.format('dddd, MMM D, YYYY')}</p>}
        {selectedTimeSlot && <p>Time: {selectedTimeSlot}</p>}
        <p>Total: <b>BHD 6</b></p>
        <Button type="primary" disabled={!selectedProfessional || !selectedDate || !selectedTimeSlot} style={{ marginTop: 10, width: '100%' }}>Continue</Button>
      </div>
    </div>
  );
};

export default SelectTime;