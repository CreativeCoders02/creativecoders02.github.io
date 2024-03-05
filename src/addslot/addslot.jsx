import { DatePicker, Select } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { CustomText } from "../text/text";

const Container = styled.div`
  h1 {
    text-align: center;
  }
  display: grid;
  justify-content: center;
`;
const AddSlot = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [cloakRoom, setCloakRoom] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your logic to handle form submission here
    console.log("Date:", date);
    console.log("Time:", time);
    console.log("Cloak Room:", cloakRoom);
  };

  return (
    <Container>
      <br></br>
      <h1>Add Slot</h1>
      <br></br>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <CustomText>From</CustomText>
          </div>
          <DatePicker style={{ minWidth: 300 }} showTime />
        </div>
        <br />
        <div>
          <div>
            <CustomText>To</CustomText>
          </div>
          <DatePicker style={{ minWidth: 300 }} showTime />
        </div>
        <br></br>
        <div>
          <div>
            <CustomText>To</CustomText>
          </div>{" "}
          <Select style={{ minWidth: 300 }}>
            {["B657", "A527", "D456", "B765"].map((item) => {
              return <Select.Option>{item}</Select.Option>;
            })}
          </Select>
        </div>
        <br></br>
        <button type="submit">Submit</button>
      </form>
    </Container>
  );
};

export default AddSlot;
