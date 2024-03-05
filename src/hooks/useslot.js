import { useEffect, useState } from "react";
import apiClient from "../apiClient";

const useSlots = (requestId) => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    apiClient
      .get("/slot", {
        params: {
          requestId: parseInt(requestId),
        },
      })
      .then((res) => setSlots(res.data));
  }, []);

  return slots;
};

export default useSlots;
