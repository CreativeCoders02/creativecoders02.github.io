import React, { useContext, useState } from "react";
import "./styles.css";
import useSlots from "../hooks/useslot";
import { AuthContext } from "../authContext";
import { message } from "antd";
import apiClient from "../apiClient";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ProofUploadPage = ({ handleRefresh }) => {
  const [selectedSlot, setSelectedSlot] = useState("");
  const [item, setItem] = useState("");
  const [proofs, setProofs] = useState([]);
  const history = useHistory();
  const slots = useSlots();

  const { auth } = useContext(AuthContext);

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
    if (selectedSlot === null || !item) {
      message.error("Please fill all the fields");
      return;
    }

    apiClient.post("/request", {
      slot: selectedSlot,
      items: item,
      username: auth.username,
    });

    message.success("Request created successfully");
    setTimeout(() => handleRefresh(), 300);
    history.push("/student/request");
  };

  return (
    <div className="proof-upload-container pageContainer">
      <h2>Proof Upload</h2>
      <form>
        <div className="form-group">
          <label>Select Slot:</label>
          <select value={selectedSlot} onChange={handleSlotChange}>
            {slots.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {new Date(slot.start_time).toLocaleTimeString()} -{" "}
                {new Date(slot.end_time).toLocaleTimeString()}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Item:</label>
          <input
            type="text"
            value={item}
            onChange={handleItemChange}
            placeholder="Enter Item"
          />
        </div>
        <div className="form-group">
          <input type="file" multiple onChange={handleProofsChange} />
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default ProofUploadPage;
