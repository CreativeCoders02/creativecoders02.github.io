import React, { useEffect, useState } from "react";
import Kanban from "./Kanban";
import { Draggable, DragDropContext } from "react-beautiful-dnd";
import apiClient from "../apiClient";
import styled from "styled-components";

const Container = styled.div`
  background-color: #fffae7;

  min-width: 100vw;
  min-height: 100vh;
`;
const StatusKanban = () => {
  const [requests, setRequests] = useState([
    {
      requestId: "1",
      username: "22BAI10129",
      name: "Sarfaraj",
    },
    {
      requestId: "2",
      username: "22BAI10129",
      name: "Sarfaraj 3",
    },
    {
      requestId: "3",
      username: "22BAI10129",
      name: "Sarfaraj 2",
    },
    {
      requestId: "4",
      username: "22BAI10129",
      name: "Sarfaraj 4",
    },
  ]);

  const [columnData, setColumnData] = useState({
    columns: {
      "column-1": {
        id: "column-1",
        title: "Pending",
        color: "#4f7aff",
        requestIds: [],
      },
      "column-2": {
        id: "column-2",
        title: "InProgress",
        color: "green",
        requestIds: [],
      },
      "column-3": {
        id: "column-3",
        title: "Completed",
        color: "red",
        requestIds: [],
      },
    },
    columnOrder: ["column-1", "column-2", "column-3"],
  });

  useEffect(() => {
    apiClient
      .get("/request")
      .then((res) => res.data)
      .then((data) => {
        const newReq = [
          ...data.map((item) => {
            return {
              ...item,
              requestId: `${item.id}`,
              username: item.student.username,
              name: item.student.first_name + item.student.last_name,
              items: item.items,
              status: item.status,
            };
          }),
        ];
        setRequests(newReq);

        return newReq;
      })
      .then((requests) => {
        const pendingIds = requests
          .filter((r) => r.status === "Pending")
          .map((r) => r.requestId);
        const inpIds = requests
          .filter((r) => r.status === "In Progress")
          .map((r) => r.requestId);
        const cmpIds = requests
          .filter((r) => r.status === "Completed")
          .map((r) => r.requestId);

        setColumnData({
          columns: {
            "column-1": {
              id: "column-1",
              title: "Pending",
              color: "#4f7aff",
              requestIds: pendingIds,
            },
            "column-2": {
              id: "column-2",
              title: "In Progress",
              color: "green",
              requestIds: inpIds,
            },
            "column-3": {
              id: "column-3",
              title: "Completed",
              color: "red",
              requestIds: cmpIds,
            },
          },
          columnOrder: ["column-1", "column-2", "column-3"],
        });
      });
  }, []);

  return (
    <Container>
      <Kanban
        taskKey="requestId"
        taskKeyCollection={"requestIds"}
        slotRequests={requests}
        setColumnData={setColumnData}
        columnData={columnData}
      />
    </Container>
  );
};

export default StatusKanban;
