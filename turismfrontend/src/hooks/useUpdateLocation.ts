import axios from 'axios';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { API_URL } from './constants';
import { ILocationData } from './useAddLocation';

export interface IUpdateLocation {
  id: string | undefined;
  location: ILocationData;
}

export const useUpdateLocation = () => {
  const history = useHistory();

  return useMutation(
    ({ id, location }: IUpdateLocation) => {
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

      return axios.put(`${API_URL}/locations/${id}`, formData, {
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
