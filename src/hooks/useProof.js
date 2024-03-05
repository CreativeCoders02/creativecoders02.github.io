import { useEffect, useState } from "react";
import apiClient from "../apiClient";

const useProofs = (requestId) => {
  const [proofs, setProofs] = useState([]);

  useEffect(() => {
    apiClient
      .get("/proof", {
        params: {
          requestId: parseInt(requestId),
        },
      })
      .then((res) => setProofs(res.data));
  }, []);

  return proofs;
};

export default useProofs;
