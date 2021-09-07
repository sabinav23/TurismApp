import { Image } from './Image';
import { Amenity } from './Amenity';

export interface Location {
  id: number;
  title: string;
  shortDescription: string;
  mainDescription: string;
  county: string;
  city: string;
  streetName: string;
  streetNumber: string;
  email: string;
  phone: string;
  price: number;
  isAccomodation: boolean;
  presentationImage: string;
  images: Image[];
  amenities: Amenity[];
  averageStars: number;
  capacity: number;
}
