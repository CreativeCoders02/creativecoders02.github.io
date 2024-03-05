import React, { useEffect, useState } from "react";
import "./styles.css";
import styled from "styled-components";
import { Route, useHistory } from "react-router-dom";
import apiClient from "../apiClient";
import AddSlot from "./addslot";
import { Button, Modal, message } from "antd";
import { CustomText } from "../text/text";
import { Link } from "react-router-dom";

const Container = styled.div`
  .slot-list-container {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  a{
    text-decoration: none !important;
  }

  .slot-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    cursor: pointer;
  }

  .slot-card {
 
    background-color: #fff !important;
    h3,
    p {
      background-color: #fff !important;
    }
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  }

  .slot-card h3 {
    margin-bottom: 10px;
    color: #333;
  }

  .slot-card p {
    margin: 5px 0;
    color: #555;
  }

  .action {
    position: fixed;
    width: 80vw;
    left: 10vw;
    height: 80px;
    bottom: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    display: grid;
    place-content: center;
    background-color: white;
  }
  background-color: #fffae7;

  min-width: 100vw;
  min-height: 100vh;
`;

const SlotListPage = () => {
  const [newSlot, setNewSlot] = useState({});
  const history = useHistory();
  const [data, setData] = useState([]);

  const onClick = ({}) => {
    history.push("/staff/status");
  };

  const [refresh, setRefresh] = useState(0);
  const handleRefresh = () => {
    setRefresh(refresh + 1);
  };

  useEffect(() => {
    apiClient
      .get("/slot")
      .then((res) => res.data)
      .then((data) => {
        setData([
          ...data.map((item) => ({
            ...item,
            roomNumber: item.room.room_number,
            block: item.room.block_number,
          })),
        ]);
      });
  }, [refresh]);

 
  return (
    <Container>
      <div className="slot-list-container">
        <h2>Slot List</h2>
        <div className="slot-cards">
          {data.map((slot, index) => (
            <Link to={`/staff/slotstatus/${slot.id}`}>
              <div className="slot-card" key={index} onClick={onClick}>
                <h3>Room Number: {slot.roomNumber}</h3>
                <p>Slot Number: {slot.id}</p>
                <p>Start Time: {new Date(slot.start_time).toLocaleString()}</p>
                <p>End Time: {new Date(slot.end_time).toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="action">
        <Button onClick={() => history.push("/staff/slots/add")}>
          Add Slot
        </Button>
      </div>

      <Route
        exact
        path="/staff/slots/add"
        component={() => {
          return (
            <Modal
              title={<CustomText size={"md"}>Add Slot</CustomText>}
              open={true}
              cancelButtonProps={{ style: { display: "none" } }}
              okButtonProps={{ style: { display: "none" } }}
              onCancel={() => history.push("/staff/slots")}
            >
              <AddSlot
                newSlot={newSlot}
                setNewSlot={setNewSlot}
                handleRefresh={handleRefresh}
              />
            </Modal>
          );
        }}
      />
    </Container>
  );
};

export default SlotListPage;
