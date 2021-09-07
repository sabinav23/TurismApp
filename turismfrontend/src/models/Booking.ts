import { Location } from './Location';

export interface Booking {
  id: number;
  endDate: string;
  startDate: string;
  firstName: string;
  lastName: boolean;
  location: Location;
}
