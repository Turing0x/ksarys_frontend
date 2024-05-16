export interface User {
  userID:         string;
  commercialCode: string;
  info:           Info;
  role:           string;
}

export interface Info {
  ci:        string;
  full_name: string;
  phone:     string;
  address:   string;
}
