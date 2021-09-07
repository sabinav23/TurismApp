import axios from "axios";
import { useMutation } from "react-query";
import { API_URL } from "./constants";

interface CheckAvailabilityData {
  startDate: string;
  endDate: string;
  id: string;
}

export const useCheckAvailability = () => {
  return useMutation(({ id, startDate, endDate }: CheckAvailabilityData) =>
    axios.post(`${API_URL}/locations/${id}/availability`, {
      startDate,
      endDate,
    })
  );
};
