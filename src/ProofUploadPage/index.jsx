import React, { useState } from 'react';
import './styles.css'; 

const ProofUploadPage = () => {
    const [selectedSlot, setSelectedSlot] = useState('');
    const [item, setItem] = useState('');
    const [proofs, setProofs] = useState([]);

    const handleSlotChange = (event) => {
        setSelectedSlot(event.target.value);
    };

    const handleItemChange = (event) => {
        setItem(event.target.value);
    };

    const handleProofsChange = (event) => {
        const files = event.target.files;
        const proofsArray = [];
        for (let i = 0; i < files.length; i++) {
            proofsArray.push(files[i]);
        }
        setProofs(proofsArray);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        console.log('Selected Slot:', selectedSlot);
        console.log('Item:', item);
        console.log('Proofs:', proofs);
    };

    return (
        <div className="proof-upload-container">
            <h2>Proof Upload</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Select Slot:</label>
                    <select value={selectedSlot} onChange={handleSlotChange}>
                        <option value="">Select Slot</option>
                        <option value="Slot 1">Slot 1</option>
                        <option value="Slot 2">Slot 2</option>
                        <option value="Slot 3">Slot 3</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div className="form-group">
                    <label>Item:</label>
                    <input type="text" value={item} onChange={handleItemChange} placeholder="Enter Item" />
                </div>
                <div className="form-group">
                    <label>Proofs:</label>
                    <input type="file" multiple onChange={handleProofsChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ProofUploadPage;
