import UserObject from './models/User'
import ConferenceObject from './models/Conference'


declare global {
  type User = UserObject;
  type Conference = ConferenceObject;

  interface FormResult {
    valid: boolean;
    errors: {message?: string, method?: string}[];
    value: any;
    name: string;
    level?: number;
  }
}
