declare interface FormResult {
    valid: boolean;
    errors: {message?: string, method?: string}[];
    value: any;
    name: string;
    level?: number;
  }
