import { create } from "zustand";

interface userType {
  id: string;
  userName: string;
  fullName: string;
  email: string;
  pass: string;
  avatar: string;
}

interface userSignInType {
  user: null | userType;
  setUser: (arg: userType | null) => void;
}

export const userSignIn = create<userSignInType>((set) => ({
  user: null,
  setUser: (userData) => set(() => ({ user: userData })),
}));
