export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  maidenName: string;
  email: string;
  phone?: string;
  name?: string;
  age: number;
  address?: {
    address: string;
    city: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
    country: string;
    postalCode: string;
    state: string;
    stateCode: string;
    birthDate: string;
    bloodGroup: string;
    ein: string;
    eyeColor: string;
    gender: string;
    image: string;
    role: string;
  };
  [key: string]: any; // fallback for optional fields
};

export type AuthState = {
  token: string | null;
  user: any | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
  currentUser: User | null;
};
