import { Location } from './Location';
import { Booking } from './Booking';

interface LocationWrapper {
  location: Location;
}

export interface User {
  id: number;
  avatar: string;
  firstName: string;
  lastName: string;
  age: number;
  isBusiness: boolean;
  bookedLocations?: LocationWrapper[];
  favoriteLocations?: LocationWrapper[];
  myLocations?: Location[];
  bookings?: Booking[];
}
