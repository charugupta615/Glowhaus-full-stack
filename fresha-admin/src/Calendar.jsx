import './styles/Calendar.css';
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { Modal, Select } from 'antd';
import 'antd/dist/reset.css';

const { Option } = Select;

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch team members for dropdown
  useEffect(() => {
    axios
      .get('https://glowhaus-full-stack.onrender.com/api/team/display')
      .then((res) => {
        console.log('Team members response:', res.data);
        setTeamMembers(res.data || []);
      })
      .catch((err) => {
        console.error('Error fetching team members:', err);
      });
  }, []);

  // Fetch bookings
  useEffect(() => {
    const url = selectedTeamId
      ? `https://glowhaus-full-stack.onrender.com/api/booking/team/${selectedTeamId}`
      : `https://glowhaus-full-stack.onrender.com/api/booking/admin/all`;

    axios
      .get(url)
      .then((res) => {
        const bookings = selectedTeamId ? res.data : res.data.bookings;

        const formatted = bookings
          .filter((booking) => booking.selected_date)
          .map((booking) => {
            const serviceNames = Array.isArray(booking.services)
              ? booking.services.map((s) => s.service_name || s).join(', ')
              : booking.services || 'No Services';

            const teamName = booking.team?.team_name || booking.team_name || 'No Team';

            const timeRange = booking.time || '09:00 - 10:00';
            const [rawStart, rawEnd] = timeRange.includes('-')
              ? timeRange.split('-').map((t) => t.trim())
              : [timeRange.trim(), null];

            const selectedDateObj = new Date(booking.selected_date);
            const dateOnly = selectedDateObj.toLocaleDateString('en-CA'); 
            const startDateTimeStr = `${dateOnly}T${rawStart}`;
            const endDateTimeStr = rawEnd ? `${dateOnly}T${rawEnd}` : null;

            const startDate = new Date(startDateTimeStr);
            const endDate = rawEnd ? new Date(endDateTimeStr) : null;

            if (isNaN(startDate) || (rawEnd && isNaN(endDate))) {
              console.warn(`Invalid time found: ${timeRange}`);
              return null;
            }

            const formattedStart = startDate.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            });
            const formattedEnd = endDate
              ? endDate.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })
              : null;

            const formattedRange = formattedEnd
              ? `${formattedStart} - ${formattedEnd}`
              : formattedStart;

            return {
              title: `${formattedRange} ${serviceNames} - ${teamName}`,
              start: startDate.toISOString(),
              color: booking.status === 'cancelled' ? '#ff4d4f' : '#1890ff',
              extendedProps: {
                customerId: booking.customer_id,
                customerName: booking.customer_name || 'Unknown Customer',
                businessName: booking.business?.name || booking.business_name || 'Unknown Business',
                status: booking.status || 'Unknown',
                services: serviceNames,
                team: teamName,
                time: formattedRange,
              },
            };
          })
          .filter(Boolean);

        setEvents(formatted);
      })
      .catch((err) => {
        console.error('Error fetching bookings:', err);
      });
  }, [selectedTeamId]);

  const handleEventClick = (info) => {
    setSelectedEvent(info.event.extendedProps);
    setIsModalOpen(true);
  };

  const handleTeamChange = (value) => {
    setSelectedTeamId(value || null);
  };

  return (
    <div className="calendar-container">
      <h2>Bookings Calendar</h2>

      <div style={{ marginBottom: 16 }}>
        <Select
          style={{ width: 300 }}
          allowClear
          placeholder="Filter by team member"
          onChange={handleTeamChange}
          value={selectedTeamId || undefined}
        >
          {teamMembers.map((member) => (
            <Option key={member.id} value={member.id}>
              {member.team_name}
            </Option>
          ))}
        </Select>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }}
        events={events}
        editable={false}
        selectable={false}
        height="auto"
        displayEventTime={false}
        eventClick={handleEventClick}
      />

      <Modal
        title="Booking Details"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {selectedEvent && (
          <div>
            <p><strong>Customer Name:</strong> {selectedEvent.customerName}</p>
            <p><strong>Business:</strong> {selectedEvent.businessName}</p>
            <p><strong>Service(s):</strong> {selectedEvent.services}</p>
            <p><strong>Team:</strong> {selectedEvent.team}</p>
            <p><strong>Time:</strong> {selectedEvent.time}</p>
            <p><strong>Status:</strong> {selectedEvent.status}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Calendar;
