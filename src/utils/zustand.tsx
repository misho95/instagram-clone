import { create } from "zustand";

interface followersType {
  id: string;
  userName: string;
}

export interface userType {
  id: string;
  userName: string;
  fullName: string;
  email: string;
  pass: string;
  avatar: string;
  following: followersType[];
}

interface userSignInType {
  user: null | userType;
  setUser: (arg: userType | null) => void;
}

export const userSignIn = create<userSignInType>((set) => ({
  user: null,
  setUser: (userData) => set(() => ({ user: userData })),
}));

interface activeNavType {
  active: null | string;
  setActive: (arg: string | null) => void;
}

export const activeNav = create<activeNavType>((set) => ({
  active: null,
  setActive: (value: string | null) => set(() => ({ active: value })),
}));
