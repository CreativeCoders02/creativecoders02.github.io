import { useEffect, useState } from "react";
import apiClient from "../apiClient";

const useRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    apiClient.get("/room").then((res) => setRooms(res.data));
  }, []);

  return rooms
};

export default useRooms
