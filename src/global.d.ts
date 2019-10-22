import UserObject from './models/User'
import ConferenceObject from './models/Conference'
import SponsorObject from './models/Sponsor'
import TrackObject from './models/Track'
import TalkObject from './models/Talk'
import { Dayjs } from 'dayjs';


declare global {
  type User = UserObject;
  type Sponsor = SponsorObject;
  type Conference = ConferenceObject;
  type Track = TrackObject;
  type Talk = TalkObject;
  type DayjsType = Dayjs

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
