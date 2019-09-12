import UserObject from './models/User'
import ConferenceObject from './models/Conference'
import SponsorObject from './models/Sponsor'
import { Dayjs } from 'dayjs';


declare global {
  type User = UserObject;
  type Sponsor = SponsorObject;
  type Conference = ConferenceObject;

  type Agenda = {
    time: Dayjs,
    description: string,
    name: string
  }

  interface FormResult {
    valid: boolean;
    errors: {message?: string, method?: string}[];
    value: any;
    name: string;
    level?: number;
  }
}
