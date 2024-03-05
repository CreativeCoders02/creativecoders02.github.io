import { Button, DatePicker, Flex, Select, message } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { CustomText } from "../text/text";
import apiClient from "../apiClient";
import { useHistory } from "react-router-dom";
import useRooms from "../hooks/useRooms";

const Container = styled.div`
  h1 {
    text-align: center;
  }
  display: grid;
  justify-content: center;
`;
const AddSlot = ({ handleRefresh }) => {
  const history = useHistory();
  const [newSlot, setNewSlot] = useState({});
  const rooms = useRooms();
  const onChange = (name, value) => {
    setNewSlot({ ...newSlot, [name]: value });
  };

  const handleAddSlot = async () => {
    console.log(newSlot);
    if (!newSlot.start_time || !newSlot.room || !newSlot.end_time) {
      return message.error("Invalid slot");
    }

    await apiClient.post("/slot", newSlot);

    message.success("Slot created successfully");
    setTimeout(()=>handleRefresh(),300)
    history.push("/staff/slots");

   
  };

  return (
    <Container>
      <form>
        <div>
          <div>
            <CustomText>From</CustomText>
          </div>
          <DatePicker
            style={{ minWidth: 300 }}
            showTime
            onChange={(date) => onChange("start_time", date.toISOString())}
          />
        </div>
        <br />
        <div>
          <div>
            <CustomText>To</CustomText>
          </div>
          <DatePicker
            style={{ minWidth: 300 }}
            showTime
            onChange={(date) => onChange("end_time", date.toISOString())}
          />
        </div>
        <br></br>
        <div>
          <div>
            <CustomText>Room Number</CustomText>
          </div>{" "}
          <Select
            style={{ minWidth: 300 }}
            onChange={(value) => onChange("room", value)}
          >
            {rooms.map((room) => {
              return (
                <Select.Option value={room.id} key={room.id}>
                  {room.room_number}
                </Select.Option>
              );
            })}
          </Select>
        </div>
        <br />
        <Flex justify="flex-end" gap={10}>
          <Button onClick={() => history.push("/staff/slots")}>Cancel</Button>
          <Button onClick={handleAddSlot} type="primary">
            Save Slot
          </Button>
        </Flex>
      </form>
    </Container>
  );
};

export default AddSlot;
