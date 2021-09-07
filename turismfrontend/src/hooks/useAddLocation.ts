import axios from 'axios';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { API_URL } from './constants';

export interface ILocationData {
  title: string;
  shortDescription: string;
  mainDescription: string;
  county: string;
  city: string;
  streetName: string;
  streetNumber: number;
  email: string;
  phone: string;
  price: number;
  isAccomodation: boolean;
  presentationImage: File | null;
  allImages: File[];
  amenities: string[];
  capacity: number;
}

export const useAddLocation = () => {
  const history = useHistory();

  return useMutation(
    (location: ILocationData) => {
      const formData = new FormData();
      const {
        title,
        shortDescription,
        mainDescription,
        county,
        city,
        streetName,
        streetNumber,
        email,
        phone,
        price,
        isAccomodation,
        presentationImage,
        allImages,
        amenities,
        capacity,
      } = location;

      formData.append('title', title);
      formData.append('shortDescription', shortDescription);
      formData.append('mainDescription', mainDescription);
      formData.append('county', county);
      formData.append('streetName', streetName);
      formData.append('streetNumber', streetNumber.toString());
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('city', city);
      formData.append('price', price.toString());
      formData.append('capacity', capacity.toString());
      formData.append('isAccomodation', isAccomodation.toString());

      amenities.forEach((a) => {
        formData.append(`amenities`, a);
      });

      if (presentationImage) {
        formData.append('presentationImage', presentationImage);
      }

      allImages.forEach((image) => {
        formData.append(`allImages`, image);
      });

      return axios.post(`${API_URL}/locations`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    {
      onSuccess: () => {
        history.push('/my-locations');
      },
    }
  );
};
