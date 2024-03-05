import React, { useContext, useEffect, useState } from "react";
import "./styles.css"; // Import the CSS file with the styles
import styled from "styled-components";
import { AuthContext } from "../authContext";
import apiClient from "../apiClient";
import { useHistory } from "react-router-dom";
import { Button, Modal } from "antd";
import { CustomText } from "../text/text";
import AddRequest from "./addRequest";
import { Route } from "react-router-dom";

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    text-align: left;
  }

  th {
    background-color: #007bff;
    color: #fff;
  }

  td.approved {
    color: #28a745;
  }

  td.pending {
    color: #ffc107;
  }

  td.rejected {
    color: #dc3545;
  }

  background-color: #fffae7;

  width: 100vw;
  min-height: 100vh;
  padding: 20px 80px;
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
`;
const RequestHistoryPage = () => {
  const { auth } = useContext(AuthContext);
  const history = useHistory();

  const [requests, setRequests] = useState([]);


  const [refresh, setRefresh] = useState(0);
  const handleRefresh = () => {
    setRefresh(refresh + 1);
  };


  useEffect(() => {
    apiClient
      .get("/request", {
        params: {
          username: auth.username,
        },
      })
      .then((res) => setRequests(res.data));
  }, [refresh]);

  return (
    <Container>
      <h2>Request History - {auth.username} </h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Items</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.items}</td>
              <td>{new Date(request.slot.start_time).toLocaleTimeString()}</td>
              <td>{new Date(request.slot.end_time).toLocaleTimeString()}</td>
              <td className={request.status.toLowerCase()}>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="action">
        <Button onClick={() => history.push("/student/request/add")}>
          Add Request
        </Button>
      </div>

      <Route
        exact
        path="/student/request/add"
        component={() => {
          return (
            <Modal
              title={<CustomText size={"md"}>Add Slot Request</CustomText>}
              open={true}
              cancelButtonProps={{ style: { display: "none" } }}
              okButtonProps={{ style: { display: "none" } }}
              onCancel={() => history.push("/student/request")}
            >
              <AddRequest handleRefresh={handleRefresh} />
            </Modal>
          );
        }}
      />
    </Container>
  );
};

export default RequestHistoryPage;
