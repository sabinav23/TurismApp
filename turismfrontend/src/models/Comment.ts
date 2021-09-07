import { User } from './User';
import { Location } from './Location';

export interface Comment {
  id: number;
  user: User;
  location: Location;
  text: string;
  stars: number;
}
