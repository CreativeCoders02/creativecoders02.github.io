import React from 'react';
import './styles.css'; 

const SlotListPage = () => {
    // Sample slot data
    const slots = [
        { roomNumber: 'Room 101', slotNumber: 1, startTime: '9:00 AM', endTime: '10:00 AM' },
        { roomNumber: 'Room 102', slotNumber: 2, startTime: '10:00 AM', endTime: '11:00 AM' },
        { roomNumber: 'Room 103', slotNumber: 3, startTime: '11:00 AM', endTime: '12:00 PM' },
        { roomNumber: 'Room 104', slotNumber: 4, startTime: '12:00 PM', endTime: '1:00 PM' },
        
    ];

    return (
        <div className="slot-list-container">
            <h2>Slot List</h2>
            <div className="slot-cards">
                {slots.map((slot, index) => (
                    <div className="slot-card" key={index}>
                        <h3>Room Number: {slot.roomNumber}</h3>
                        <p>Slot Number: {slot.slotNumber}</p>
                        <p>Start Time: {slot.startTime}</p>
                        <p>End Time: {slot.endTime}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SlotListPage;
