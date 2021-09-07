import axios from "axios";
import { useMutation } from "react-query";
import { API_URL } from "./constants";

interface CheckAvailabilityData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  startDate: string;
  endDate: string;
  id: string;
}

export const useAddBooking = () => {
  return useMutation(
    ({
      id,
      startDate,
      endDate,
      firstName,
      lastName,
      phoneNumber,
      email,
    }: CheckAvailabilityData) =>
      axios.post(`${API_URL}/locations/${id}/book`, {
        firstName,
        lastName,
        phoneNumber,
        email,
        startDate,
        endDate,
      })
  );
};
